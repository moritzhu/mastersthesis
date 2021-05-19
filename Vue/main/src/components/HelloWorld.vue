<template>
  <div class="hello">
    <h1>{{ this.image }}</h1>
    <button v-on:click="showImageEscaped= !showImageEscaped">show image escaped</button>
    <button v-on:click="showImageUnescaped= !showImageUnescaped">show image unescaped</button>

    <div v-if="this.showImageEscaped"> {{this.image}} </div>
    <div v-if="this.showImageUnescaped" v-html="this.image"> </div>

    <button v-on:click="showLinkEscaped= !showLinkEscaped">show Link escaped</button>
    <button v-on:click="showLinkUnescaped= !showLinkUnescaped">show Link unescaped</button>

    <div v-if="this.showLinkEscaped"> {{this.link}} </div>
    <div v-if="this.showLinkUnescaped" v-html="this.link"> </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => {
    return{
    input : "Here is your input",
    image : "<img src='' onerror='alert(0)' />",
    link :  `<a href="javascript:alert('Test')"> evil link </a>`,
    showImageEscaped: false,
    showImageUnescaped: false,
    
    showLinkEscaped: false,
    showLinkUnescaped: false,
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
