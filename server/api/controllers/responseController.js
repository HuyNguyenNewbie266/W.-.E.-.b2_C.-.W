const mongoose = require('mongoose');
const Response = mongoose.model('Response');
const { generateCustomCode } = require('../helpers/generateCodeHelper');
const { buildPrompt } = require('../helpers/promptHelper');
const axios = require('axios');

exports.get_all = async (req, res) => {
  try{
    const responses = await Response.find({});
    res.json(responses);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get_by_id = async (req, res) => {
  try {
    const response = await Response.findById(req.params.id);
    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }
    res.json(response);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { 
      key, 
      title, 
      value, 
      category } = req.body;

    const newResponse = new Response({ 
      key, 
      title, 
      value, 
      category
    });

    if (!newResponse.key) {
      newResponse.key = generateCustomCode('RES', newResponse._id);
    }


    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { 
      key, 
      title, 
      value, 
      category
     } = req.body;
    
    const updatedResponse = await Response.findByIdAndUpdate(
      req.params.id,
      { 
      key, 
      title, 
      value, 
      category
     },
      { returnDocument: 'after', runValidators: true }
    );
    if (!updatedResponse) {
      return res.status(404).json({ message: 'Response not found' });
    }
    res.json(updatedResponse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedResponse = await Response.findByIdAndDelete(req.params.id);
    if (!deletedResponse) {
      return res.status(404).json({ message: 'Response not found' });
    }
    res.json({ message: 'Response deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get_category_counts = async (req, res) => {
  try {
    const counts = await Response.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    const result = {};
    counts.forEach(c => result[c._id] = c.count);
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get_recent = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const recent = await Response.find({}).sort({ createdAt: -1 }).limit(limit);
    res.json(recent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.search = async (req, res) => {
  try {
    const { q, cursor, limit = 5 } = req.query;
    let query = {};
    
    if (q) {
      // === ÁP DỤNG SAFE QUERY Ở ĐÂY ===
      const safeQuery = q.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const regex = new RegExp(safeQuery, 'i');

      query.$or = [
        { title: regex },
        { value: regex },
        { category: regex },
        { key: regex }
      ];
    }

    if (cursor) {
      query._id = { $lt: cursor };
    }

    const responses = await Response.find(query)
      .sort({ _id: -1 })
      .limit(parseInt(limit));

    let nextCursor = null;
    if (responses.length === parseInt(limit)) {
      nextCursor = responses[responses.length - 1]._id;
    }

    // Đếm tổng số lượng (cũng nên dùng query đã có $or)
    const total = await Response.countDocuments(query.$or ? { $or: query.$or } : {});

    res.json({ data: responses, nextCursor, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy 5 câu hỏi ngẫu nhiên cho bài Test
exports.get_random_test_data = async (req, res) => {
  try {
    // Dùng $sample của MongoDB để bốc ngẫu nhiên 5 document
    const randomResponses = await Response.aggregate([
      { $sample: { size: 5 } }
    ]);

    // Xử lý dữ liệu trước khi gửi về Frontend
    const testData = randomResponses.map(item => {
      // 1. Xóa toàn bộ thẻ HTML (vì nội dung lưu từ Editor thường có thẻ <p>, <strong>...)
      const plainText = item.value.replace(/<[^>]*>?/gm, '').trim();
      
      // 2. Trích xuất câu đầu tiên (cắt tới dấu chấm, hỏi chấm, hoặc chấm than đầu tiên)
      const firstSentenceMatch = plainText.match(/^[^.!?]+[.!?]/);
      const excerpt = firstSentenceMatch ? firstSentenceMatch[0] : plainText;

      return {
        _id: item._id,
        key: item.key,
        title: item.title,
        excerpt: excerpt.trim()
      };
    });

    res.json(testData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.ask_ai = async (req, res) => {
  try {
    const userQuestion = req.body.question;

    // 1. HÀM TẨY RỬA KÝ TỰ ĐẶC BIỆT (Tránh sập Regex)
    const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

    // 2. TẠO CÂU TRUY VẤN AN TOÀN
    // Tách câu hỏi thành từng chữ, xóa khoảng trắng thừa, tẩy rửa ký tự và ghép lại bằng dấu '|'
    const safeQuery = userQuestion
      .split(' ')
      .filter(word => word.trim() !== '') 
      .map(word => escapeRegex(word))
      .join('|');

    const regex = new RegExp(safeQuery, 'i');

    // 3. TÌM KIẾM BÀI VIẾT (Giữ nguyên như cũ)
    const foundArticles = await Response.find({
      $or: [
        { title: regex },
        { value: regex },
        { key: regex }
      ]
    }).limit(3);

    // Nếu database hoàn toàn không có gì khớp xíu nào
    if (foundArticles.length === 0) {
      return res.json({ 
        answer: "Sorry, this request is outside of my scope or I couldn't find relevant documents.",
        sources: [] 
      });
    }

    // 2. GỘP VÀO PROMPT (Dùng hàm buildPrompt ở Bước 2)
    const finalPrompt = buildPrompt(userQuestion, foundArticles);

    // 3. GỌI OLLAMA Ở LOCALHOST
    const aiResponse = await axios.post('http://localhost:11434/api/generate', {
      model: 'qwen2.5:7b',
      prompt: finalPrompt,
      stream: false // Nhận kết quả 1 lần, không cần stream từng chữ
    });

    let answerText = aiResponse.data.response;

    // 4. TRẢ KẾT QUẢ VỀ FRONTEND
    // Frontend sẽ dựa vào mảng sources này để tạo thẻ <router-link>
    res.json({
      answer: answerText,
      sources: foundArticles.map(a => ({ id: a._id, title: a.title }))
    });

  } catch (error) {
    console.error("Lỗi gọi AI:", error);
    res.status(500).json({ message: "Lỗi kết nối AI Server." });
  }
};

