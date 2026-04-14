app.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    },
    student: {
      type: String,
      required: true
    }
  },template:
  /*html*/
  `   <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
      <p>{{ student }}</p>`,

})