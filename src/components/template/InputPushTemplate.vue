<template>
  <v-container>
    <div class="input-scenario"><v-text-field v-model="scenario" color="orange orange-darken-4" label="Scenario"></v-text-field></div>
    <div class="main-push">
      <v-row>
        <v-col cols="12" md="2">
          <h2>App push msg</h2>
        </v-col>
        <v-col cols="12" md="4">
          <v-textarea
            color=""
            label="Input App Push Msg Titile"
            v-model="pushTitle"
          ></v-textarea
        ></v-col>
        <v-col cols="12" md="6">
          <v-textarea
            color=""
            label="Input App Push Msg Content"
            v-model="pushContent"
          ></v-textarea
        ></v-col>
      </v-row>
    </div>

    <div class="main-sms">
      <v-row>
        <v-col cols="12" md="2">
          <h2>SMS Template</h2>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            color=""
            label="Input App Push Msg Content"
            v-model="smsContent"
          ></v-textarea
        ></v-col>
      </v-row>
    </div>
    <div class="main-email">
      <v-row>
        <v-col cols="12" md="2">
          <h2>Email Content</h2>
        </v-col>

        <v-col cols="12" md="4">
          <v-textarea
            color=""
            label="Input App Push Msg Titile"
            v-model="emailTitle"
          ></v-textarea
        ></v-col>
        <v-col cols="12" md="">
          <v-textarea
            color=""
            label="Input App Push Msg Content"
            v-model="emailContent"
          ></v-textarea
        ></v-col>
      </v-row>
    </div>
    <div style="display: flow-root;">
      <v-btn style="float:right" color="primary" @click="clickConvert"
        >Click Convert Query</v-btn
      >
    </div>
    <v-card>
      <v-tabs v-model="tab">
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#eventAssociate">
          Event Associate
        </v-tab>
        <v-tab href="#pushTemplate">
          Push Template
        </v-tab>
        <v-tab href="#smsTemplate">
          Sms Template
        </v-tab>
        <v-tab href="#emailTemplate">
          Email Template
        </v-tab>
        <v-tab href="#templatePadding">
          Template Padding
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item :key="1" value="eventAssociate">
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="dataQueryAssociate"
                class="elevation-1"
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="2" value="pushTemplate">
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="dataQueryPush"
                class="elevation-1"
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="3" value="smsTemplate">
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="dataQuerySms"
                class="elevation-1"
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="4" value="emailTemplate">
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="dataQueryEmail"
                class="elevation-1"
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="5" value="templatePadding">
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="dataQueryPaddingTemplate"
                class="elevation-1"
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "InputPushTemplate",

  data() {
    return {
      tab: null,
      headers: [
        {
          text: "Query SQL",
          value: "name",
        },
      ],
      scenario: "",
      pushTitle: "",
      pushContent: "",
      smsContent: "",
      emailTitle: "",
      emailContent: "",
      dataQueryAssociate: [],
      dataQueryPush: [],
      dataQueryEmail: [],
      dataQuerySms: [],
      dataQueryPaddingTemplate: [],
      dataParamPush: [],
    };
  },
  methods: {
    clickConvert() {
      let getId = this.replaceScenarioId(this.scenario);
      // GET QUERY SQL EVENTASSOSIATE
      this.dataParamPush = this.mapEventAssociate(getId);
      this.dataQueryAssociate = this.convertArrayToObj(this.dataParamPush);

      // GET QUERY SQL PUSH TEMPLATE
      let getContentPush = this.replaceContent(this.pushContent);
      let getTitlePush = this.replaceContent(this.pushTitle);
      this.dataParamPush = this.mapPushTemplate(
        getId,
        getTitlePush,
        getContentPush
      );
      this.dataQueryPush = this.convertArrayToObj(this.dataParamPush);

      // GET QUERY SQL SMS TEMPLATE
      let getContentSms = this.replaceContent(this.smsContent);
      this.dataParamPush = this.mapSmsTemplate(getId, getContentSms);
      this.dataQuerySms = this.convertArrayToObj(this.dataParamPush);

      // GET QUERY SQL EMAIL TEMPLATE
      let getContentEmail = this.replaceContentEmail(this.emailContent);
      let getTitleEmail = this.replaceContent(this.emailTitle);
      this.dataParamPush = this.mapEmailTemplate(
        getId,
        getTitleEmail,
        getContentEmail
      );
      this.dataQueryEmail = this.convertArrayToObj(this.dataParamPush);

      // GET QUERY SQL PUSH PADDING
      let getALLParamPush = [];
      let getParamPushContent = this.getParameter(this.pushContent);
      let getParamPushTile = this.getParameter(this.pushTitle);

      getALLParamPush = [...getParamPushContent, ...getParamPushTile];
      getALLParamPush = this.removeLoopParam(getALLParamPush);
      let dataParamPushApp = this.mapPushPadding(getId, getALLParamPush);

      // GET QUERY SQL SMS PADDING
      let getALLParamSms = this.getParameter(this.smsContent);
      getALLParamSms = this.removeLoopParam(getALLParamSms);
      let dataParamSms = this.mapSmsPadding(getId, getALLParamSms);

      // GET QUERY SQL EMAIL PADDING
      let getALLParamEmail = [];
      let getParamEmailContent = this.getParameter(this.emailContent);
      let getParamEmailTile = this.getParameter(this.emailTitle);

      getALLParamEmail = [...getParamEmailContent, ...getParamEmailTile];
      getALLParamEmail = this.removeLoopParam(getALLParamEmail);
      let dataParamEmail = this.mapEmailPadding(getId, getALLParamEmail);

      let dataQueryAllPaddingTemplate = [
        ...dataParamPushApp,
        ...dataParamSms,
        ...dataParamEmail,
      ];

      this.dataQueryPaddingTemplate = this.convertArrayToObj(
        dataQueryAllPaddingTemplate
      );
    },

    convertArrayToObj(array) {
      let convert = [];
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        let data = { name: element };
        convert.push(data);
      }
      return convert;
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
    mapSmsTemplate(id, smsContent) {
      let querySQL = [
        `INSERT INTO sms_template(TEMPLATE_ID, CONTENT, STATE, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY) VALUES ('sms_${id}', '${smsContent}', '2', now(), NULL, 'ex-hoangxuanthap001', NULL);`,
      ];
      return querySQL;
    },
    mapEmailTemplate(id, emailTitle, emailContent) {
      let querySQL = [
        `INSERT INTO email_template(TEMPLATE_ID, SUBJECT, CONTENT, STATE, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY, UPDATE_TIME, CREATE_TIME) VALUES ('email_${id}', '${emailTitle}', '<p>${emailContent}</p>', '2', '2021-02-22 17:41:33', NULL, 'MANUAL', NULL, NULL, NULL);`,
      ];
      return querySQL;
    },
    mapPushPadding(id, pushParam) {
      let queryData = [];
      for (let i = 0; i < pushParam.length; i++) {
        const element = pushParam[i];
        let query = [
          `INSERT INTO template_data_padding(ID, EVENT, TEST_TEMPLATE_ID, PRD_TEMPLATE_ID, PADDING_ORDER, SOURCE_KEY, TAGET_KEY, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY) VALUES ('push_${id}_${element}', '${id}', 'push_${id}', 'push_${id}', ${i +
            1}, '${element}', '${element}', NULL, NULL, NULL, NULL);`,
        ];
        queryData.push(query);
      }
      return queryData;
    },
    mapSmsPadding(id, smsParam) {
      let queryData = [];
      for (let i = 0; i < smsParam.length; i++) {
        const element = smsParam[i];
        let query = [
          `INSERT INTO template_data_padding(ID, EVENT, TEST_TEMPLATE_ID, PRD_TEMPLATE_ID, PADDING_ORDER, SOURCE_KEY, TAGET_KEY, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY) VALUES ('sms_${id}_${element}', '${id}', 'sms_${id}', 'sms_${id}', ${i +
            1}, '${element}', '${element}', NULL, NULL, NULL, NULL);`,
        ];
        queryData.push(query);
      }
      return queryData;
    },
    mapEmailPadding(id, emailParam) {
      let queryData = [];
      for (let i = 0; i < emailParam.length; i++) {
        const element = emailParam[i];
        let query = [
          `INSERT INTO template_data_padding(ID, EVENT, TEST_TEMPLATE_ID, PRD_TEMPLATE_ID, PADDING_ORDER, SOURCE_KEY, TAGET_KEY, CREATE_DATE, UPDATE_DATE, CREATE_BY, UPDATE_BY) VALUES ('email_${id}_${element}', '${id}', 'email_${id}', 'email_${id}', ${i +
            1}, '${element}', '${element}', NULL, NULL, NULL, NULL);`,
        ];
        queryData.push(query);
      }
      return queryData;
    },

    getParameter(param) {
      let pramLower = param.toLowerCase();
      let regexParam = /S*[A-Za-z_]\S*[_]\S*\b/g;
      let getParam = pramLower.match(regexParam);
      if (getParam) {
        return getParam;
      } else return "";
    },
    removeLoopParam(param) {
      let uniq = [...new Set(param)];
      return uniq;
    },
    replaceContent(param) {
      let getParam = /S*[A-Za-z_]\S*[_]\S*\b/g;
      let paramLowerCase = param.replace(getParam, function(v) {
        return v.toLowerCase();
      });
      return paramLowerCase.replace(getParam, "#{$&}");
    },
    replaceContentEmail(param) {
      let getParam = /S*[A-Za-z_]\S*[_]\S*\b/g;
      let regexEnter = /\n/g;
      let paramLowerCase = param.replace(getParam, function(v) {
        return v.toLowerCase();
      });
      let regexParam = paramLowerCase.replace(getParam, "#{$&}");
      let regexEnterAndParam = regexParam.replace(regexEnter, "<br>");
      return regexEnterAndParam;
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
  height: 200px;
  background-color: burlywood;
}
.main-sms {
  height: 200px;
  background-color: bisque;
}
.main-email {
  height: 200px;
  background-color: darkgray;
}
.input-scenario{
  background-color: #00bcd4;
}
</style>
