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
      dataParamPush: [],
    };
  },
  methods: {
    clickConvert() {
      console.log("myArray::::", this.getParameter(this.pushContent));
      console.log("myArray::::", this.replacePushContent(this.pushContent));

      // console.log("myArray::::", this.replaceScenarioId(this.scenario));
      // this.dataParamPush = this.getParameter(this.pushContent);
      // console.log("this.dataParamPush:::", this.dataParamPush);

      let getId = this.replaceScenarioId(this.scenario);

      // GET QUERY SQL EVENTASSOSIATE
      this.dataParamPush = this.mapEventAssociate(getId);

      // GET QUERY SQL PUSH TEMPLATE
      // let getContentPush = this.replacePushContent(this.pushContent);
      // let getParamPush = this.getParameter(this.pushContent);
      // this.dataParamPush = this.mapPushTemplate(
      //   getId,
      //   this.pushTitle,
      //   getContentPush
      // );

      // GET QUERY SQL PUSH PADDING
      // let getParamPush = this.getParameter(this.pushContent);
      // this.dataParamPush = this.mapPushPadding(getId, getParamPush);

      this.dataQuery = this.dataParamPush;
    },

    mapEventAssociate(param) {
      let querySQL = [
        `INSERT INTO event_associate_template(ID, EVENT, EVENT_DESC, NOTICE_TYPE, SEND_BY_TEMPLATE, EVENT_TYPE, IS_ALL_SEND, IS_SEND_BATCH, SEND_OBJECT, RECEIVER_WAY, DEFAULT_SEND_FLAG, TEST_TEMPLATE_ID, PRD_TEMPLATE_ID, MARKET_FLAG, SEND_TIME, IS_DELAY_TYPE, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY) VALUES ('${param}_sms', '${param}', '${param}', '01', 'Y', '01', 'N', 'N', NULL, '05', 'Y', 'sms_${param}', 'sms_${param}', 'N', NULL, 'N', now(), NULL, 'ex-hoangxuanthap001', NULL);`,
        `INSERT INTO event_associate_template(ID, EVENT, EVENT_DESC, NOTICE_TYPE, SEND_BY_TEMPLATE, EVENT_TYPE, IS_ALL_SEND, IS_SEND_BATCH, SEND_OBJECT, RECEIVER_WAY, DEFAULT_SEND_FLAG, TEST_TEMPLATE_ID, PRD_TEMPLATE_ID, MARKET_FLAG, SEND_TIME, IS_DELAY_TYPE, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY) VALUES ('${param}_email', '${param}', '${param}', '02', 'Y', '01', 'N', 'N', NULL, '05', 'Y', 'email_${param}', 'email_${param}', 'N', NULL, 'N', now(), NULL, 'ex-hoangxuanthap001', NULL);`,
        `INSERT INTO event_associate_template(ID, EVENT, EVENT_DESC, NOTICE_TYPE, SEND_BY_TEMPLATE, EVENT_TYPE, IS_ALL_SEND, IS_SEND_BATCH, SEND_OBJECT, RECEIVER_WAY, DEFAULT_SEND_FLAG, TEST_TEMPLATE_ID, PRD_TEMPLATE_ID, MARKET_FLAG, SEND_TIME, IS_DELAY_TYPE, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY) VALUES ('${param}_push', '${param}', '${param}', '03', 'Y', '01', 'N', 'N', NULL, '05', 'Y', 'push_${param}', 'push_${param}', 'N', NULL, 'N', now(), NULL, 'ex-hoangxuanthap001', NULL);`,
      ];
      return querySQL;
    },
    mapPushTemplate(id, pushTitle, pushContent) {
      let querySQL = [
        `INSERT INTO push_notification_template(TEMPLATE_ID, SUBJECT, CONTENT, STATE, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY) VALUES ('push_${id}', '${pushTitle}', '${pushContent}', '2', '2021-04-22 17:41:33', '2021-04-22 17:41:33', 'ex-nguyenvinhnam', 'ex-nguyenvinhnam');`,
      ];
      return querySQL;
    },
    mapSmsTemplate(id, pushTitle, pushContent) {
      let querySQL = [
        `INSERT INTO push_notification_template(TEMPLATE_ID, SUBJECT, CONTENT, STATE, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY) VALUES ('sms_${id}', '${pushTitle}', '${pushContent}', '2', '2021-04-22 17:41:33', '2021-04-22 17:41:33', 'ex-nguyenvinhnam', 'ex-nguyenvinhnam');`,
      ];
      return querySQL;
    },
    mapEmailTemplate(id, pushTitle, pushContent) {
      let querySQL = [
        `INSERT INTO email_template(TEMPLATE_ID, SUBJECT, CONTENT, STATE, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY) VALUES ('email_${id}', '${pushTitle}', '${pushContent}', '2', '2021-04-22 17:41:33', '2021-04-22 17:41:33', 'ex-nguyenvinhnam', 'ex-nguyenvinhnam');`,
      ];
      return querySQL;
    },
    mapPushPadding(id, pushParam) {
      let queryData = [];
      for (let i = 0; i < pushParam.length; i++) {
        const element = pushParam[i];
        let query = [
          `INSERT INTO template_data_padding(ID, EVENT, TEST_TEMPLATE_ID, PRD_TEMPLATE_ID, PADDING_ORDER, SOURCE_KEY, TAGET_KEY, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY) VALUES ('push_${id}', '${element}', 'pus_${element}', 'push_${element}', ${i+1}, '${element}', '${element}', NULL, NULL, NULL, NULL);`,
        ];
        queryData.push(query);
      }
      return queryData;
    },
    mapSmsPadding(id, pushParam) {
      let queryData = [];
      for (let i = 0; i < pushParam.length; i++) {
        const element = pushParam[i];
        let query = [
          `INSERT INTO template_data_padding(ID, EVENT, TEST_TEMPLATE_ID, PRD_TEMPLATE_ID, PADDING_ORDER, SOURCE_KEY, TAGET_KEY, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY) VALUES ('sms_${id}', '${element}', 'sms_${element}', 'sms_${element}', ${i+1}, '${element}', '${element}', NULL, NULL, NULL, NULL);`,
        ];
        queryData.push(query);
      }
      return queryData;
    },
    mapEmailPadding(id, pushParam) {
      let queryData = [];
      for (let i = 0; i < pushParam.length; i++) {
        const element = pushParam[i];
        let query = [
          `INSERT INTO template_data_padding(ID, EVENT, TEST_TEMPLATE_ID, PRD_TEMPLATE_ID, PADDING_ORDER, SOURCE_KEY, TAGET_KEY, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY) VALUES ('email_${id}', '${element}', 'email_${element}', 'email_${element}', ${i}, '${element}', '${element}', NULL, NULL, NULL, NULL);`,
        ];
        queryData.push(query);
      }
      return queryData;
    },

    getParameter(param) {
      let regexParam = /S*[A-Za-z_]\S*[_]\S*\b/g;
      let getParam = param.match(regexParam);
      let uniq = [...new Set(getParam)];
      return uniq;
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
