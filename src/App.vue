<template>
  <v-app>


    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import InputPushTemplate from './components/push-template/InputPushTemplate';

export default {
  name: 'App',

  components: {
    InputPushTemplate,
  },

  data: () => ({
    //
  }),
};
</script>
