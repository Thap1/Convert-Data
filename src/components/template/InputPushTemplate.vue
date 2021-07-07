<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2">
        <div class="">App push msg</div>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field v-model="scenario" label="Scenario"></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-textarea
          color="orange orange-darken-4"
          label="Input App Push Msg Titile"
          v-model="pushTitle"
        ></v-textarea
      ></v-col>
      <v-col cols="12" md="4">
        <v-textarea
          color="orange orange-darken-4"
          label="Input App Push Msg Content"
          v-model="pushContent"
        ></v-textarea
      ></v-col>
    </v-row>
    <v-btn style="float:right" color="primary" @click="clickConvert"
      >Click Convert Query</v-btn
    >
  </v-container>
</template>

<script>
export default {
  name: "InputPushTemplate",
  data() {
    return {
      scenario: "Successful Loan Payment",
      pushTitle: "loan_product_name Payment Successful",
      pushContent:
        "Thank you for your payment of currncy_code tx_amount to your loan_product_name ending loan_account_no, customer_first_name!",
    };
  },
  methods: {
    clickConvert() {
      // const regexContent= (\S*[A-Za-z_]\S*[_]\S*)\b;
      // console.log('scenario:::', this.scenario);
      // console.log('pushTitle:::', this.pushTitle);
      // console.log('pushContent:::', this.pushContent);

      console.log("myArray::::", this.getParamPushContent(this.pushContent));
      console.log("myArray::::", this.replacePushContent(this.pushContent));
    },
    getParamPushContent(param) {
      let getParam = /S*[A-Za-z_]\S*[_]\S*\b/g;
      return param.match(getParam);
    },
    replacePushContent(param) {
      let getParam = /S*[A-Za-z_]\S*[_]\S*\b/g;
      // let replaceParam = /\#{\L$1}/;
      return param.replace(getParam, '#{$&}');
    },
  },
};
</script>
