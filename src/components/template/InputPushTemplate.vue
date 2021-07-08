<template>
  <v-container>
    <v-text-field v-model="scenario" label="Scenario"></v-text-field>
    <div class="main-push">
      <v-row>
        <v-col cols="12" md="2">
          <div class="">App push msg</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-textarea
            color="orange orange-darken-4"
            label="Input App Push Msg Titile"
            v-model="pushTitle"
          ></v-textarea
        ></v-col>
        <v-col cols="12" md="6">
          <v-textarea
            color="orange orange-darken-4"
            label="Input App Push Msg Content"
            v-model="pushContent"
          ></v-textarea
        ></v-col>
      </v-row>
    </div>

    <div class="main-sms">
      <v-row>
        <v-col cols="12" md="2">
          <div class="">SMS Template</div>
        </v-col>

        <v-col cols="12" md="4">
          <v-textarea
            color="orange orange-darken-4"
            label="Input App Push Msg Titile"
            v-model="smsTitle"
          ></v-textarea
        ></v-col>
        <v-col cols="12" md="6">
          <v-textarea
            color="orange orange-darken-4"
            label="Input App Push Msg Content"
            v-model="smsContent"
          ></v-textarea
        ></v-col>
      </v-row>
    </div>
    <div class="main-email">
      <v-row>
        <v-col cols="12" md="2">
          <div class="">Email Content</div>
        </v-col>

        <v-col cols="12" md="4">
          <v-textarea
            color="orange orange-darken-4"
            label="Input App Push Msg Titile"
            v-model="emailTitle"
          ></v-textarea
        ></v-col>
        <v-col cols="12" md="">
          <v-textarea
            color="orange orange-darken-4"
            label="Input App Push Msg Content"
            v-model="emailContnet"
          ></v-textarea
        ></v-col>
      </v-row>
    </div>
    <v-btn style="float:right" color="primary" @click="clickConvert"
      >Click Convert Query</v-btn
    >
    <div class="">
      <v-textarea solo label="Query Data" v-model="dataQuery"></v-textarea>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "InputPushTemplate",
  data() {
    return {
      scenario:
        "=Successful fund transfer/+------ scheduled fund transfer (to other bank via Instapay)",
      pushTitle: "loan_product_name Payment Successful",
      pushContent:
        "Thank you for your payment of currncy_code tx_amount to your loan_product_name ending loan_account_no, customer_first_name!",
      smsTitle: "",
      smsContent: "",
      emailTitle: "",
      emailContnet: "",
      dataQuery: "",
      dataParamPush:[]
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
      console.log("myArray::::", this.replaceScenarioId(this.scenario));
      this.dataParamPush = this.getParamPushContent(this.pushContent);
      this.dataQuery = this.dataParamPush.filter((item, index) => this.dataParamPush.indexOf(item) !== index);
    },
    getParamPushContent(param) {
      let getParam = /S*[A-Za-z_]\S*[_]\S*\b/g;
      return param.match(getParam);
    },
    replacePushContent(param) {
      let getParam = /S*[A-Za-z_]\S*[_]\S*\b/g;
      return param.replace(getParam, "#{$&}");
    },
    replaceScenarioId(param) {
      let regexUnderco = /\s*[^0-9a-zA-Z]/g;
      let idScenario = param.toLowerCase();
      let temp = idScenario.replace(regexUnderco, "_");
      let left = 0;
      let right = temp.length;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] == "_") {
          left++;
        } else {
          break;
        }
      }
      for (let i = temp.length - 1; i >= 0; i--) {
        if (temp[i] == "_") {
          right--;
        } else {
          break;
        }
      }
      temp = temp.substring(left, right);
      let result = "";
      let c = "";
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] != "_") {
          result += temp[i];
          c = temp[i];
        } else {
          if (c != "_") {
            result += temp[i];
            c = temp[i];
          }
        }
      }
      return result;
    },
  },
};
</script>
<style scoped>
.main-push {
  height: 300px;
  background-color: burlywood;
}
.main-sms {
  height: 300px;
  background-color: bisque;
}
.main-email {
  height: 300px;
  background-color: darkgray;
}
</style>
