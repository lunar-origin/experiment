// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.Download",
      "filePrefix": "labjstemplate",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "labjsTemplate",
    "description": "",
    "repository": "",
    "contributors": "Masanori Kobayashi"
  },
  "messageHandlers": {},
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.flow.Loop",
      "templateParameters": [],
      "sample": {
        "mode": "draw-shuffle"
      },
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {
        "before:prepare": async function anonymous(
) {
//参加者番号がすでにあるかどうかをチェック
if(this.state.participantID)
{
  return;
}
//参加者番号が生成されていない場合に生成
else
{
  let participantID;

  //JATOS以外の場合は参加者番号をランダム生成する
  if (typeof jatos == 'undefined') {
    participantID = this.random.range(10000, 100000);
  }
  //JATOS利用時は参加者番号にJATOSのWorker IDを置き換える
  else{
    participantID = await new Promise((resolve) => {
      jatos.onLoad(() => resolve(jatos.workerId))
    })
  }
  this.state.participantID = participantID;
}

//作成した(または読み込んだ)参加者番号をlab.jsに読み込む
this.options.templateParameters.push({participantID: this.state.participantID})

//metadataプラグインから情報取得
const userAgentInfo = this.state.meta.userAgent
const platformInfo = this.state.meta.platform

let platform;

//OSで分岐
//OSを表示
if(platformInfo =='iPhone' || platformInfo =='iPad' || userAgentInfo.indexOf('android') > 0){
  platform = 'notPC'
}
else{
  platform = 'PC'
}
//結果を変数に入れる
this.state.platform = platform
}
      },
      "title": "Global loop",
      "plugins": [
        {
          "type": "fullscreen",
          "message": "この実験はフルスクリーンで実施します。準備ができたら，下のボタンを押してください。",
          "hint": "\u003Cbutton\u003Eフルスクリーンを許可する\u003C\u002Fbutton\u003E",
          "path": "lab.plugins.Fullscreen"
        }
      ],
      "tardy": true,
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {
          "": ""
        },
        "parameters": {},
        "messageHandlers": {},
        "title": "Global Sequence",
        "content": [
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "title": "パソコン以外では実施できません",
                "content": "パソコンから実施してください。ブラウザを閉じて，パソコンから実施してください。"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "終了",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "endIfNotPC",
            "tardy": true,
            "skip": "${this.state.platform == 'PC'}"
          },
          {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Briefing",
            "content": [
              {
                "type": "lab.html.Page",
                "items": [
                  {
                    "required": true,
                    "type": "text",
                    "title": "ご参加ありがとうございます。",
                    "content": "本測定への参加はあなたの任意によるものです。"
                  },
                  {
                    "required": true,
                    "type": "text",
                    "title": "本測定の目的",
                    "content": "他者理解に関する各種データ収集を行うことが本測定の目的です。"
                  },
                  {
                    "required": true,
                    "type": "text",
                    "title": "本測定の手続き",
                    "content": "本測定では以下の３つの測定についてマウスを使って回答していただきます。全体の所要時間は20分～30分程度です。"
                  },
                  {
                    "required": true,
                    "type": "html",
                    "content": "\u003Col\u003E\r\n\u003Cli\u003Eあるキャラクターの思いや感情を判断する多肢選択式の課題\u003C\u002Fli\u003E\r\n\u003Cli\u003Eある状況において生じる可能性が高い感情を選択する課題\u003C\u002Fli\u003E\r\n\u003Cli\u003E共感性に関するアンケート\u003C\u002Fli\u003E\r\n\u003C\u002Fol\u003E  ",
                    "name": ""
                  },
                  {
                    "required": true,
                    "type": "text",
                    "title": "潜在的なリスク・苦痛など",
                    "content": "実験による多少の疲労を除き，潜在的なリスクや苦痛はありません。また，いつ，いかなる理由でも，自由に測定を中止していただけます（参加と中止もご参照ください）。"
                  },
                  {
                    "required": true,
                    "type": "text",
                    "title": "参加による利益",
                    "content": "あなたが本測定に参加することで教育，学習，認知，感情についての研究の発展に繋がります。"
                  },
                  {
                    "required": true,
                    "type": "text",
                    "title": "匿名性の確保",
                    "content": "本測定によって得られた情報について，匿名性は統計的解析によって保たれます。収集されたデータは匿名化した上で，統計的処理を行い，学会発表や論文で公表されます。また，二次分析として，匿名化した上で各個人のデータを公表する場合があります。いずれの場合であっても，個人が特定される形でデータが公表されることは決してありません。"
                  },
                  {
                    "required": true,
                    "type": "text",
                    "title": "参加と中止",
                    "content": "あなたは本測定への参加もしくは不参加を自由に選択できます。また，参加した場合でも，いつでも，どのような理由でも，途中で実験・調査を中止することができます。もし，途中で実験・調査を中止したくなった場合は，「ESCキー」を押した後，ウィンドウを閉じることで実験・調査を中止できます。"
                  },
                  {
                    "required": true,
                    "type": "checkbox",
                    "options": [
                      {
                        "label": "上記の説明をよく読み，理解した上で，実験・調査への参加に同意します。",
                        "coding": "yes"
                      }
                    ],
                    "label": "\u003Cspan style = \"color: tomato\"\u003E実験・調査への参加に同意いただけますか？　同意いただける方はチェックをお願いいたします。同意いただけない方は，ESCを押した後，ウィンドウを閉じてください。\u003C\u002Fspan\u003E",
                    "name": "IC"
                  },
                  {
                    "required": true,
                    "type": "html",
                    "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                    "name": ""
                  }
                ],
                "scrollTop": true,
                "submitButtonText": "\u003E\u003E次へ",
                "submitButtonPosition": "hidden",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {},
                "title": "informedConsent",
                "width": "m"
              },
              {
                "type": "lab.html.Page",
                "items": [
                  {
                    "required": true,
                    "type": "input",
                    "label": "年齢",
                    "attributes": {
                      "type": "number",
                      "min": "18",
                      "max": "99"
                    },
                    "help": "年齢を半角数字で入力してください。",
                    "name": "age"
                  },
                  {
                    "required": false,
                    "type": "radio",
                    "label": "性別",
                    "options": [
                      {
                        "label": " 女性",
                        "coding": "f"
                      },
                      {
                        "label": " 男性",
                        "coding": "m"
                      },
                      {
                        "label": " その他",
                        "coding": "x"
                      }
                    ],
                    "name": "sex",
                    "help": "性別を回答してください（回答したくない方は空欄でかまいません）。"
                  },
                  {
                    "required": true,
                    "type": "html",
                    "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                    "name": ""
                  }
                ],
                "scrollTop": true,
                "submitButtonText": "次へ",
                "submitButtonPosition": "hidden",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {},
                "title": "demographic",
                "width": "m"
              }
            ]
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "title": "ご参加ありがとうございます。",
                "content": ""
              },
              {
                "required": true,
                "type": "text",
                "content": "",
                "title": "準備ができた方は「次へ」を押して，開始してください。"
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "次へ",
            "submitButtonPosition": "hidden",
            "files": {
              "inst.001.png": "embedded\u002F3c3debfd0f862e2cd8b74bd5429a56760959056bfb6ba3c435ae0e1cc2442603.png"
            },
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Instruction（要修正）",
            "width": "m"
          },
          {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Main（ネスト含めて要修正）",
            "content": [
              {
                "title": "Sharp_Observation",
                "type": "lab.flow.Sequence",
                "parameters": {},
                "plugins": [],
                "metadata": {
                  "title": "Sharp_Observation",
                  "description": "",
                  "repository": "",
                  "contributors": ""
                },
                "files": {},
                "responses": {},
                "content": [
                  {
                    "type": "lab.html.Page",
                    "items": [
                      {
                        "required": true,
                        "type": "text",
                        "title": "実験の説明",
                        "content": "こちらが ヨニ です。"
                      },
                      {
                        "required": true,
                        "type": "image",
                        "src": "${ this.files[\"yoni.SVG\"] }",
                        "name": ""
                      },
                      {
                        "required": true,
                        "type": "text",
                        "content": "ヨニは周りの人やものに注意を向けています。\nヨニが注意を向けているその対象をマウスカーソルで選び，左ボタンをクリックして，できるだけ速く，かつ正確に選択してください。"
                      },
                      {
                        "required": true,
                        "type": "text",
                        "content": "例えば，ヨニがオレンジに注意を向けていれば，オレンジを囲んでいる枠内をクリックしてください。以下が画面の例です。\n"
                      },
                      {
                        "required": true,
                        "type": "image",
                        "src": "${ this.files[\"教示用画面例.SVG\"] }",
                        "name": ""
                      },
                      {
                        "required": true,
                        "type": "text",
                        "content": "約30試行ごとに休憩を挿み，計3ブロックあります。"
                      },
                      {
                        "required": true,
                        "type": "text",
                        "content": "「次へ」ボタンを押すと，実験が始まります。"
                      },
                      {
                        "required": true,
                        "type": "html",
                        "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                        "name": ""
                      }
                    ],
                    "scrollTop": true,
                    "submitButtonText": "次へ →",
                    "submitButtonPosition": "hidden",
                    "files": {
                      "yoni.SVG": "embedded\u002F8fd6998964ca12239821a6a3030697fb1137ead44d548691dbe48f5176e3f270.SVG",
                      "教示用画面例.SVG": "embedded\u002Fe1b43681ce762e945582405032f7331f7be052c895ab44b8462a25464f737e5c.SVG"
                    },
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Inst",
                    "timeline": [],
                    "width": "m"
                  },
                  {
                    "type": "lab.flow.Loop",
                    "templateParameters": [
                      {
                        "img": "4",
                        "correct": "2",
                        "cond": "Cog1"
                      },
                      {
                        "img": "5",
                        "correct": "1",
                        "cond": "Phy1"
                      },
                      {
                        "img": "6",
                        "correct": "1",
                        "cond": "Aff1"
                      },
                      {
                        "img": "7",
                        "correct": "3",
                        "cond": "Aff1"
                      },
                      {
                        "img": "8",
                        "correct": "2",
                        "cond": "Cog1"
                      },
                      {
                        "img": "9",
                        "correct": "2",
                        "cond": "Phy1"
                      },
                      {
                        "img": "10",
                        "correct": "4",
                        "cond": "Phy1"
                      },
                      {
                        "img": "11",
                        "correct": "4",
                        "cond": "Cog1"
                      },
                      {
                        "img": "12",
                        "correct": "3",
                        "cond": "Aff1"
                      },
                      {
                        "img": "13",
                        "correct": "3",
                        "cond": "Cog1"
                      },
                      {
                        "img": "14",
                        "correct": "4",
                        "cond": "Phy1"
                      },
                      {
                        "img": "15",
                        "correct": "1",
                        "cond": "Aff1"
                      },
                      {
                        "img": "16",
                        "correct": "2",
                        "cond": "Aff1"
                      },
                      {
                        "img": "17",
                        "correct": "2",
                        "cond": "Cog1"
                      },
                      {
                        "img": "18",
                        "correct": "3",
                        "cond": "Phy1"
                      },
                      {
                        "img": "19",
                        "correct": "2",
                        "cond": "Phy1"
                      },
                      {
                        "img": "20",
                        "correct": "4",
                        "cond": "Aff1"
                      },
                      {
                        "img": "21",
                        "correct": "2",
                        "cond": "Phy1"
                      },
                      {
                        "img": "22",
                        "correct": "1",
                        "cond": "Phy1"
                      },
                      {
                        "img": "23",
                        "correct": "3",
                        "cond": "Aff1"
                      },
                      {
                        "img": "24",
                        "correct": "3",
                        "cond": "Cog1"
                      },
                      {
                        "img": "25",
                        "correct": "1",
                        "cond": "Cog1"
                      },
                      {
                        "img": "26",
                        "correct": "2",
                        "cond": "Aff1"
                      },
                      {
                        "img": "27",
                        "correct": "3",
                        "cond": "Cog1"
                      }
                    ],
                    "sample": {
                      "mode": "draw-shuffle"
                    },
                    "files": {
                      "14.SVG": "embedded\u002F1ff5f1c14f46688cba24998cd5b39c3afbba01b479148ae3af1afc1132aa6ba1.SVG",
                      "15.SVG": "embedded\u002Fdd5b6633b847ca273d0d3482cae8106615f541a5ee66590c02d299c80d8b8b14.SVG",
                      "16.SVG": "embedded\u002F2dfb57441ab398452e485be6579dd2c6f5fdb07a511252c1d4674f8954e8956e.SVG",
                      "17.SVG": "embedded\u002Fe8bedc7f9a83c5f6947807624712c78aced2e02fa16e5bbb4cdb5e7f87f75bc4.SVG",
                      "18.SVG": "embedded\u002F037bc53efd409d4596f8be351b0e1763bd7264723bcd04d399893becf6aa42a8.SVG",
                      "19.SVG": "embedded\u002F526f878c67feacbf104d311afa47ada23c627c5704723715739962fb6495ee58.SVG",
                      "20.SVG": "embedded\u002F601ee507d07248a8699446c4a57540abecd366ce3667abe3c248dd94efb07391.SVG",
                      "21.SVG": "embedded\u002Fdbe2674831b1d4a05c7f176caaf163c349aeec14cf462873e7ebcc90c35da6a9.SVG",
                      "22.SVG": "embedded\u002Fdfb9cb631cdcacc74b80937eb00043a51a613cd4c70540f83725704b7194e16d.SVG",
                      "23.SVG": "embedded\u002F6be02163a902348160ce04dcef5db29b79f5253a93604f9ec7b109162cea8e41.SVG",
                      "24.SVG": "embedded\u002F27d6f51a6664bbaa962143f3449fb2f182976a478e12637c4b43fafe279ecfe1.SVG",
                      "25.SVG": "embedded\u002F7da110f02f3855e827c68230b4bd00f8d074cc5ad5ccbc0d26c97ca1e6c3c812.SVG",
                      "26.SVG": "embedded\u002F800aa7b353d0570e1505c8d2125a27565443180076115ce5a1bbcb228da437f2.SVG",
                      "27.SVG": "embedded\u002F9a5562bab96a8c39e891276c3dd8bf46b9d4172e7e9fdb06acb1d92a3c242d0d.SVG",
                      "4.SVG": "embedded\u002F8e689abacf5b2d02299f9dbfbce6d1046cf505608c187851af682f2b1f769df2.SVG",
                      "5.SVG": "embedded\u002Fb07b13814e9690bc52035384e82ac5cc880c886f223396824e48afa9b46df8a7.SVG",
                      "6.SVG": "embedded\u002Fa70036bfc20b8cb828b7e30e0fe97e26725c8b94b7281bbf10fc63827b3f626e.SVG",
                      "7.SVG": "embedded\u002F05d9e9995fe279ff06db23d7086cb0fd3ff80e3044e69bfab27abe4c082bd44b.SVG",
                      "8.SVG": "embedded\u002F306a18480a9e16b207073e7eb7825eaf2cbdbb02a84974b1db79899845092a8a.SVG",
                      "9.SVG": "embedded\u002Fa235a6fc490d5f30bc33b46118e4554ee9980f99afb43e2b6878d459084b5e0d.SVG",
                      "10.SVG": "embedded\u002Fb29cf19a819855dea7b84ce977ba4559217fe54edc02212680649180d42f2a3e.SVG",
                      "11.SVG": "embedded\u002Facf97f11ffeb2c279e1826d58dbc0a00d0038deda6dac37960b254d68bff0628.SVG",
                      "12.SVG": "embedded\u002Fb915c7cd8e4bf59cea7a00d306ee19e91dcb1e0474db7f7c301f4d864fc7d072.SVG",
                      "13.SVG": "embedded\u002Fb57ed76d447e7b81b18660f3152006ead01b106d4dc1d1e949bfdcbd54ef1122.SVG"
                    },
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Part A",
                    "shuffleGroups": [],
                    "template": {
                      "type": "lab.flow.Sequence",
                      "files": {},
                      "responses": {
                        "": ""
                      },
                      "parameters": {},
                      "messageHandlers": {},
                      "title": "Trial",
                      "content": [
                        {
                          "type": "lab.canvas.Screen",
                          "content": [],
                          "viewport": [
                            800,
                            600
                          ],
                          "files": {},
                          "responses": {
                            "": ""
                          },
                          "parameters": {},
                          "messageHandlers": {},
                          "title": "Blank",
                          "timeout": "1500"
                        },
                        {
                          "type": "lab.canvas.Screen",
                          "content": [
                            {
                              "type": "image",
                              "left": 0,
                              "top": 0,
                              "angle": 0,
                              "width": "800",
                              "height": "600",
                              "stroke": null,
                              "strokeWidth": 0,
                              "fill": "black",
                              "src": "${ this.files[parameters.img + \".SVG\"] }"
                            },
                            {
                              "type": "aoi",
                              "left": "-219",
                              "top": "-74",
                              "angle": 0,
                              "width": 144,
                              "height": 144,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "rgba(0, 0, 0, 0.2)",
                              "label": "1"
                            },
                            {
                              "type": "aoi",
                              "left": "219",
                              "top": "-74",
                              "angle": 0,
                              "width": "144",
                              "height": "144",
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "rgba(0, 0, 0, 0.2)",
                              "label": "2"
                            },
                            {
                              "type": "aoi",
                              "left": "-219",
                              "top": "198",
                              "angle": 0,
                              "width": "144",
                              "height": "144",
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "rgba(0, 0, 0, 0.2)",
                              "label": "3"
                            },
                            {
                              "type": "aoi",
                              "left": "219",
                              "top": "198",
                              "angle": 0,
                              "width": "144",
                              "height": "144",
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "rgba(0, 0, 0, 0.2)",
                              "label": "4"
                            }
                          ],
                          "viewport": [
                            800,
                            600
                          ],
                          "files": {
                            "4.SVG": "embedded\u002F8f87e7c1b5a3b5b1e7bbbd0dc061216c291318925aa0f9f9757b60e18aa59b3e.SVG"
                          },
                          "responses": {
                            "click @1": "1",
                            "click @2": "2",
                            "click @3": "3",
                            "click @4": "4"
                          },
                          "parameters": {},
                          "messageHandlers": {},
                          "title": "Image",
                          "correctResponse": "${ parameters.correct }"
                        }
                      ]
                    }
                  },
                  {
                    "type": "lab.html.Page",
                    "items": [
                      {
                        "type": "text",
                        "title": "ここで休憩です。",
                        "content": "準備が整ったら，「続ける」ボタンを押してください。2ブロック目が始まります。"
                      },
                      {
                        "required": true,
                        "type": "html",
                        "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E続ける\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                        "name": ""
                      }
                    ],
                    "scrollTop": true,
                    "submitButtonText": "続ける →",
                    "submitButtonPosition": "hidden",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Break"
                  },
                  {
                    "type": "lab.flow.Loop",
                    "templateParameters": [
                      {
                        "img": "29",
                        "correct": "2",
                        "cond": "Aff1"
                      },
                      {
                        "img": "30",
                        "correct": "2",
                        "cond": "Gloat"
                      },
                      {
                        "img": "31",
                        "correct": "3",
                        "cond": "Identification"
                      },
                      {
                        "img": "32",
                        "correct": "2",
                        "cond": "Physical"
                      },
                      {
                        "img": "33",
                        "correct": "4",
                        "cond": "Envy"
                      },
                      {
                        "img": "34",
                        "correct": "3",
                        "cond": "Aff1"
                      },
                      {
                        "img": "35",
                        "correct": "3",
                        "cond": "Identification"
                      },
                      {
                        "img": "36",
                        "correct": "3",
                        "cond": "Aff1"
                      },
                      {
                        "img": "37",
                        "correct": "2",
                        "cond": "Gloat"
                      },
                      {
                        "img": "38",
                        "correct": "2",
                        "cond": "Gloat"
                      },
                      {
                        "img": "39",
                        "correct": "4",
                        "cond": "identification"
                      },
                      {
                        "img": "40",
                        "correct": "4",
                        "cond": "Cog1"
                      },
                      {
                        "img": "41",
                        "correct": "1",
                        "cond": "Gloat"
                      },
                      {
                        "img": "42",
                        "correct": "3",
                        "cond": "Envy"
                      },
                      {
                        "img": "43",
                        "correct": "1",
                        "cond": "Physical"
                      },
                      {
                        "img": "44",
                        "correct": "3",
                        "cond": "Cog1"
                      },
                      {
                        "img": "45",
                        "correct": "3",
                        "cond": "Physical"
                      },
                      {
                        "img": "46",
                        "correct": "4",
                        "cond": "Identification"
                      },
                      {
                        "img": "47",
                        "correct": "2",
                        "cond": "Gloat"
                      },
                      {
                        "img": "48",
                        "correct": "1",
                        "cond": "Physical"
                      },
                      {
                        "img": "49",
                        "correct": "1",
                        "cond": "Physical"
                      },
                      {
                        "img": "50",
                        "correct": "3",
                        "cond": "Physical"
                      },
                      {
                        "img": "51",
                        "correct": "4",
                        "cond": "Identification"
                      },
                      {
                        "img": "52",
                        "correct": "4",
                        "cond": "Envy"
                      },
                      {
                        "img": "53",
                        "correct": "3",
                        "cond": "Envy"
                      },
                      {
                        "img": "54",
                        "correct": "4",
                        "cond": "Aff1"
                      },
                      {
                        "img": "55",
                        "correct": "2",
                        "cond": "Gloat"
                      },
                      {
                        "img": "56",
                        "correct": "4",
                        "cond": "Envy"
                      },
                      {
                        "img": "57",
                        "correct": "3",
                        "cond": "Envy"
                      },
                      {
                        "img": "58",
                        "correct": "3",
                        "cond": "Cog1"
                      },
                      {
                        "img": "59",
                        "correct": "2",
                        "cond": "Cog1"
                      },
                      {
                        "img": "60",
                        "correct": "2",
                        "cond": "Identification"
                      }
                    ],
                    "sample": {
                      "mode": "draw-shuffle"
                    },
                    "files": {
                      "29.SVG": "embedded\u002F003754a0b9f43063f3f950c69347fb06729c1a9a36d797b681c97de8984cb507.SVG",
                      "30.SVG": "embedded\u002Fbb296d6b550d15b8510cb626954417c51073fff896d4ae86d29efaf3fa22ebf4.SVG",
                      "31.SVG": "embedded\u002F32b0a651fe2963880681f48d1e6fbb87edf66d713cf305b4c75571528c72951c.SVG",
                      "32.SVG": "embedded\u002F14990480944bb25a212bdc914c317c190c8ac8db3a4673ef7f09401cbdf1364a.SVG",
                      "33.SVG": "embedded\u002Fa6008e3fdbee6cf5b9c580c6a0f61f88e85fb7de2f793455e43af78c0f7036c6.SVG",
                      "34.SVG": "embedded\u002Faba2a43651f57bfb10249472119d3ff1723026d9b1dc124e66ed0cd93d04650b.SVG",
                      "35.SVG": "embedded\u002F58af63b5a6c510b7b02a050e8c62d7123a78618da91a7a605e31d881f809649e.SVG",
                      "36.SVG": "embedded\u002F484ad162eeb9b276f8c9950cc0619a7508556d6cc12e26dbec607bd3b477251a.SVG",
                      "37.SVG": "embedded\u002F679d52ca991c1e7f55b3070eb153926aebb15be3be83495b37aa6f59374ff490.SVG",
                      "38.SVG": "embedded\u002F3c6a5e895b6ea7227dba372ce55b1c18b74e37c6d71147b90deb7fb1272f4d67.SVG",
                      "39.SVG": "embedded\u002Fc893c0715528f1a5ace1ec5775d6aee840030ae5f48f0bc357126beea6af4163.SVG",
                      "40.SVG": "embedded\u002F882fe159621225e0b8555034d29855fc6e39ea79f2e54b44863b0ea3e6a606fc.SVG",
                      "41.SVG": "embedded\u002Fea4dd855c53e7dde8d780d0daa0eae5fb1145287a46d97098d80ab269783b3ce.SVG",
                      "42.SVG": "embedded\u002Fab5c94d93cf04b1fe94b9c1670a3fef4a1aab680d4a082f2a65286c25c4419dd.SVG",
                      "43.SVG": "embedded\u002F4b22cf09384972744e34a4d76f77c06e54c1dc77b87d4ba32feb945e4fd73fd9.SVG",
                      "44.SVG": "embedded\u002Fe4f3b89cb05bae42026b8b3350164001d8834a692a39c26498144513f78f4372.SVG",
                      "45.SVG": "embedded\u002F899478dc7ced182c5492da83f99ea8cc0a0bb73000aa6fdbc898656b02f7ff04.SVG",
                      "46.SVG": "embedded\u002F45fbdeee81f4ded8b74b9d3b3f44531819bca2c064d29cf3411ac141bc763550.SVG",
                      "47.SVG": "embedded\u002Ff085f1ec07c75ca8ae0fb9af041f8a613df6cac52c6ca12003adf0df57d1bb18.SVG",
                      "48.SVG": "embedded\u002F5eee9502267461368df59c115b6f8dda0616e1f6a41b18545d9cc6dbd51bd15c.SVG",
                      "49.SVG": "embedded\u002F89204db0cd0778e75efc1f32108a1ec3b67e312deb0ff8470ea4e00dc9665a6e.SVG",
                      "50.SVG": "embedded\u002F779cb2c2eebe79f29f2b95d59b9caff8d151a30d23713c60f3de92bb61a1ec63.SVG",
                      "51.SVG": "embedded\u002F78b551425ea774c066a1be6d5b9a51851b3d8afa31246b34fb53e1217f73d95d.SVG",
                      "52.SVG": "embedded\u002F8138c24bb5275028b498b557bbc74873f05f710e277f47e123f01430354f22d3.SVG",
                      "53.SVG": "embedded\u002F8327f635dd66a298fc4324c191a299cf0d53e3d287e022fb59e1e45e0c37fe8c.SVG",
                      "54.SVG": "embedded\u002Fc6ed5163329cd45127b05275f88703f11a2a8a4232cf774f1b1914b17f6db9c6.SVG",
                      "55.SVG": "embedded\u002Fa6a0ab3b9c5357e4d0eb80749cf6f7c7eeba733141ace8ad1aab2f3db81f9bc9.SVG",
                      "56.SVG": "embedded\u002F42b002e6888949b8a54ab4219fad4fd2564a1f6aaf9f9bdd40f04e6b617c8ed3.SVG",
                      "57.SVG": "embedded\u002F411393decc7b4c9456b5035ee6013e4954998816ef128270d5a2c02f6006d184.SVG",
                      "58.SVG": "embedded\u002F0f80c2ee528a51f6d192701d57d81a567e08a827acd0f8a93b570f7c80a79417.SVG",
                      "59.SVG": "embedded\u002F3645af42111094a4ae124bffa8c24fe59c1af973b135c6047af57ff663c92692.SVG",
                      "60.SVG": "embedded\u002F9071526a87650dfa7c1e707c28991265c655d8edad5b9e50a0d647b6c391e118.SVG"
                    },
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Part B",
                    "shuffleGroups": [],
                    "template": {
                      "type": "lab.flow.Sequence",
                      "files": {},
                      "responses": {
                        "": ""
                      },
                      "parameters": {},
                      "messageHandlers": {},
                      "title": "Trial",
                      "content": [
                        {
                          "type": "lab.canvas.Screen",
                          "content": [],
                          "viewport": [
                            800,
                            600
                          ],
                          "files": {},
                          "responses": {
                            "": ""
                          },
                          "parameters": {},
                          "messageHandlers": {},
                          "title": "Blank",
                          "timeout": "1500"
                        },
                        {
                          "type": "lab.canvas.Screen",
                          "content": [
                            {
                              "type": "image",
                              "left": 0,
                              "top": 0,
                              "angle": 0,
                              "width": "800",
                              "height": "600",
                              "stroke": null,
                              "strokeWidth": 0,
                              "fill": "black",
                              "src": "${ this.files[parameters.img + \".SVG\"] }"
                            },
                            {
                              "type": "aoi",
                              "left": "-219",
                              "top": "-74",
                              "angle": 0,
                              "width": 144,
                              "height": 144,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "rgba(0, 0, 0, 0.2)",
                              "label": "1"
                            },
                            {
                              "type": "aoi",
                              "left": "219",
                              "top": "-74",
                              "angle": 0,
                              "width": "144",
                              "height": "144",
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "rgba(0, 0, 0, 0.2)",
                              "label": "2"
                            },
                            {
                              "type": "aoi",
                              "left": "-219",
                              "top": "198",
                              "angle": 0,
                              "width": "144",
                              "height": "144",
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "rgba(0, 0, 0, 0.2)",
                              "label": "3"
                            },
                            {
                              "type": "aoi",
                              "left": "219",
                              "top": "198",
                              "angle": 0,
                              "width": "144",
                              "height": "144",
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "rgba(0, 0, 0, 0.2)",
                              "label": "4"
                            }
                          ],
                          "viewport": [
                            800,
                            600
                          ],
                          "files": {
                            "4.SVG": "embedded\u002F8f87e7c1b5a3b5b1e7bbbd0dc061216c291318925aa0f9f9757b60e18aa59b3e.SVG"
                          },
                          "responses": {
                            "click @1": "1",
                            "click @2": "2",
                            "click @3": "3",
                            "click @4": "4"
                          },
                          "parameters": {},
                          "messageHandlers": {},
                          "title": "Image",
                          "correctResponse": "${ parameters.correct }"
                        }
                      ]
                    }
                  },
                  {
                    "type": "lab.html.Page",
                    "items": [
                      {
                        "type": "text",
                        "title": "ここで休憩です。",
                        "content": "準備が整ったら，「続ける」ボタンを押してください。3ブロック目が始まります。"
                      },
                      {
                        "required": true,
                        "type": "html",
                        "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E続ける\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                        "name": ""
                      }
                    ],
                    "scrollTop": true,
                    "submitButtonText": "続ける →",
                    "submitButtonPosition": "hidden",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Break"
                  },
                  {
                    "type": "lab.flow.Loop",
                    "templateParameters": [
                      {
                        "img": "62",
                        "correct": "4",
                        "cond": "Cog2"
                      },
                      {
                        "img": "63",
                        "correct": "3",
                        "cond": "Cog2"
                      },
                      {
                        "img": "64",
                        "correct": "2",
                        "cond": "Cog2"
                      },
                      {
                        "img": "65",
                        "correct": "4",
                        "cond": "Phy2"
                      },
                      {
                        "img": "66",
                        "correct": "1",
                        "cond": "Aff2"
                      },
                      {
                        "img": "67",
                        "correct": "2",
                        "cond": "Aff2"
                      },
                      {
                        "img": "68",
                        "correct": "3",
                        "cond": "Mix"
                      },
                      {
                        "img": "69",
                        "correct": "1",
                        "cond": "Mix"
                      },
                      {
                        "img": "70",
                        "correct": "1",
                        "cond": "Phy2"
                      },
                      {
                        "img": "71",
                        "correct": "1",
                        "cond": "Cog2"
                      },
                      {
                        "img": "72",
                        "correct": "4",
                        "cond": "Cog2"
                      },
                      {
                        "img": "73",
                        "correct": "1",
                        "cond": "Cog2"
                      },
                      {
                        "img": "74",
                        "correct": "4",
                        "cond": "Mix"
                      },
                      {
                        "img": "75",
                        "correct": "3",
                        "cond": "Cog2"
                      },
                      {
                        "img": "76",
                        "correct": "2",
                        "cond": "Cog2"
                      },
                      {
                        "img": "77",
                        "correct": "1",
                        "cond": "Cog2"
                      },
                      {
                        "img": "78",
                        "correct": "2",
                        "cond": "Aff2"
                      },
                      {
                        "img": "79",
                        "correct": "1",
                        "cond": "Mix"
                      },
                      {
                        "img": "80",
                        "correct": "2",
                        "cond": "Aff2"
                      },
                      {
                        "img": "81",
                        "correct": "1",
                        "cond": "Aff2"
                      },
                      {
                        "img": "82",
                        "correct": "3",
                        "cond": "Phy2"
                      },
                      {
                        "img": "83",
                        "correct": "3",
                        "cond": "Aff2"
                      },
                      {
                        "img": "84",
                        "correct": "2",
                        "cond": "Mix"
                      },
                      {
                        "img": "85",
                        "correct": "4",
                        "cond": "Mix"
                      },
                      {
                        "img": "86",
                        "correct": "1",
                        "cond": "Phy2"
                      },
                      {
                        "img": "87",
                        "correct": "3",
                        "cond": "Aff2"
                      },
                      {
                        "img": "88",
                        "correct": "3",
                        "cond": "Mix"
                      },
                      {
                        "img": "89",
                        "correct": "4",
                        "cond": "Aff2"
                      },
                      {
                        "img": "90",
                        "correct": "2",
                        "cond": "Mix"
                      },
                      {
                        "img": "91",
                        "correct": "4",
                        "cond": "Mix"
                      },
                      {
                        "img": "92",
                        "correct": "3",
                        "cond": "Mix"
                      },
                      {
                        "img": "93",
                        "correct": "2",
                        "cond": "Cog2"
                      },
                      {
                        "img": "94",
                        "correct": "1",
                        "cond": "Aff2"
                      },
                      {
                        "img": "95",
                        "correct": "2",
                        "cond": "Mix"
                      },
                      {
                        "img": "96",
                        "correct": "4",
                        "cond": "Aff2"
                      },
                      {
                        "img": "97",
                        "correct": "4",
                        "cond": "Aff2"
                      },
                      {
                        "img": "98",
                        "correct": "1",
                        "cond": "Phy2"
                      },
                      {
                        "img": "99",
                        "correct": "2",
                        "cond": "Cog2"
                      },
                      {
                        "img": "100",
                        "correct": "3",
                        "cond": "Cog2"
                      },
                      {
                        "img": "101",
                        "correct": "4",
                        "cond": "Phy2"
                      },
                      {
                        "img": "102",
                        "correct": "2",
                        "cond": "Aff2"
                      },
                      {
                        "img": "103",
                        "correct": "4",
                        "cond": "Mix"
                      }
                    ],
                    "sample": {
                      "mode": "draw-shuffle"
                    },
                    "files": {
                      "62.SVG": "embedded\u002Fad0e5a80ae449ec6031fef468582fc892f5b201e4a540524fd79b702c2e5706e.SVG",
                      "63.SVG": "embedded\u002Fb539491582c9847bfc7bf53666a0a9efc016500574a6bd4e2773d29329ffe4e3.SVG",
                      "64.SVG": "embedded\u002Fea09f9068572d293ba879fd7e691354b514b4f0bd3a67367b78cf2f968a3855f.SVG",
                      "65.SVG": "embedded\u002F8c8951f15998b6af2f3720d409cbbb9f5eebb385aaf6b19a635c55ac2d1c0226.SVG",
                      "66.SVG": "embedded\u002F1046826e321c4ed77038d36c2f038313e0c214a9e986ea3d2b783377fe7202c7.SVG",
                      "67.SVG": "embedded\u002F5578ee2cb003783fde029a40a9d59df129e8de361525c8cdf6477d2dfba974c2.SVG",
                      "68.SVG": "embedded\u002F167b8b07b5a3a0964123324d23453eba1e27efa05ca7397abba91e9b0850d543.SVG",
                      "69.SVG": "embedded\u002Fc80978d6366738614dae205ee736938cc6c6faee7c086b29b1c86642c28353e9.SVG",
                      "70.SVG": "embedded\u002F4810dbc034527498b85c1e7de5901a583be41487feca68aed16320b9b36fc297.SVG",
                      "71.SVG": "embedded\u002Fd52a7adb75ef48a8a9f3698097afcc98b1a55b9703dc4575962562d8d577ca9e.SVG",
                      "72.SVG": "embedded\u002F6b6efd1de4e22293f4076cbb4270e599b62e4f382cae57d61ee4d0dd56f650bb.SVG",
                      "73.SVG": "embedded\u002F50037c5a5615618c2e189dd009cb136f95f9b92de74010222ffba959c67ff77e.SVG",
                      "74.SVG": "embedded\u002Fef4c84a2d4570409a52ff5f704e403482c41f69e694306e89c9df4cb051160ce.SVG",
                      "75.SVG": "embedded\u002F5d3a91e18067d88241dd9b2a471e48c6bbaa6a6806cd44e8bc1f2b01e86ddb41.SVG",
                      "76.SVG": "embedded\u002F52f712c96a6546b3002d753d71357b3eb1b1ba9be20175b80402145c65e0ee16.SVG",
                      "77.SVG": "embedded\u002F71561ded4c41cba508526b2b336f603f42d21499753deea04d858e52459b9296.SVG",
                      "78.SVG": "embedded\u002Fccfdb422e8535247893d85297697493812b61e8d9a383b29a7b28643731635e3.SVG",
                      "79.SVG": "embedded\u002Fba8c9e0bc29d5a5ee0495120da3e2f923a1494d304ff5e761b27c6adaaf18e57.SVG",
                      "80.SVG": "embedded\u002F44210cf83677a7d8edbc37a3198d01eb94f9004d27c94e6aa823ba94c45d3d07.SVG",
                      "81.SVG": "embedded\u002F62ffd0657372c5d2d243c647df8e93e20f4744ff62e77731b8397495ffca7765.SVG",
                      "82.SVG": "embedded\u002Fc6d428d4c9640fae745db42020c50c2bdc952ac078111bd0d942338a9ebfb516.SVG",
                      "83.SVG": "embedded\u002F07e2911f61f4d66f24fba827c7df60e2af7e25e6ba68502a84e1d745705eb7eb.SVG",
                      "84.SVG": "embedded\u002Fdd5b2e102ab3bb6327836856133a4076c0b3a37aaab039cfa31fbb6bc4428cea.SVG",
                      "85.SVG": "embedded\u002Fd5e3303f5935293959b2bf24e28ef0c1e5416bf3e95ff4184566f0968b6e5c78.SVG",
                      "86.SVG": "embedded\u002F93e41cadb674d9dcb376234aaf636da74579c9a21eedc38a0d61c36221eacf04.SVG",
                      "87.SVG": "embedded\u002Fd0b74cf5560c6b4848d8938966504ab7f6f8dfd27b1254e7ac5f344dadc1d14b.SVG",
                      "88.SVG": "embedded\u002Fcfb9892c607b6ec8bc2f5e6e873d52974877c3a7b46382ada7888f0a93656c73.SVG",
                      "89.SVG": "embedded\u002F48f081435c2473f4643ba3b723f4aef1aaac3fc9863ca9047ebb3eaf58c38259.SVG",
                      "90.SVG": "embedded\u002Fa45e8e51017d566d1103b336628761233a76b17765f7b14fde1a14bb11597fee.SVG",
                      "91.SVG": "embedded\u002F5cbb260344e40aa24bcace42796a8f33c22743c7ced46ea4e7402611773a4933.SVG",
                      "92.SVG": "embedded\u002Fa1577a686cc4dfe3d55ce97708817ad7be0865ff2601b9d46604c3b7336a2f9c.SVG",
                      "93.SVG": "embedded\u002F20e7f8051316677f297f242c8300a30adf4d5b78e6db5d090b3de8c0c2864ee9.SVG",
                      "94.SVG": "embedded\u002F858e2b528aa8fb55b6bd50f30a31b8294f63933bedd8b047c6ed2f78659d4e2a.SVG",
                      "95.SVG": "embedded\u002Fac2ce57019ecffa9b6d12e62596b9f7f7a6750d0cb8819d2658827b2c9bbfb52.SVG",
                      "96.SVG": "embedded\u002F0f982ed6b55b5cb5ed6d7bb655e4bd0cffc9c5bf848e295592d927aaa0e5f663.SVG",
                      "97.SVG": "embedded\u002F57848d27b68e2c8e53e954df55719c81282f4da88ec02593570d90f0cee75b7e.SVG",
                      "98.SVG": "embedded\u002F286cc2de6fd6b1a788c0a32d752d9b18a5540d5e7ed1ae7bf8d2165c1c4b2bfd.SVG",
                      "99.SVG": "embedded\u002Fbbe437d7b9e22c6d497046a12e95bdf2ce70f2f7a5649820e48d6d25e5d43575.SVG",
                      "100.SVG": "embedded\u002F0ad504ecd35b27d1a6fb0effbadd7316b74f3a4689307dce376a84385e562713.SVG",
                      "101.SVG": "embedded\u002F647db532d7518b84dfd0d958588f16459428069cb9d1cca7db309e18bcdc2df2.SVG",
                      "102.SVG": "embedded\u002F3ca26d58e44346e1498619f56a55573f8ce70f53b27c5b6c280db354cc4a27fd.SVG",
                      "103.SVG": "embedded\u002F44c21e1c108ae44f6300984d48d3c6c290fb0a8a6f2ca3ff9843576360d93c28.SVG"
                    },
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Part C",
                    "shuffleGroups": [],
                    "template": {
                      "type": "lab.flow.Sequence",
                      "files": {},
                      "responses": {
                        "": ""
                      },
                      "parameters": {},
                      "messageHandlers": {},
                      "title": "Trial",
                      "content": [
                        {
                          "type": "lab.canvas.Screen",
                          "content": [],
                          "viewport": [
                            800,
                            600
                          ],
                          "files": {},
                          "responses": {
                            "": ""
                          },
                          "parameters": {},
                          "messageHandlers": {},
                          "title": "Blank",
                          "timeout": "1500"
                        },
                        {
                          "type": "lab.canvas.Screen",
                          "content": [
                            {
                              "type": "image",
                              "left": 0,
                              "top": 0,
                              "angle": 0,
                              "width": "800",
                              "height": "600",
                              "stroke": null,
                              "strokeWidth": 0,
                              "fill": "black",
                              "src": "${ this.files[parameters.img + \".SVG\"] }"
                            },
                            {
                              "type": "aoi",
                              "left": "-219",
                              "top": "-74",
                              "angle": 0,
                              "width": 144,
                              "height": 144,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "rgba(0, 0, 0, 0.2)",
                              "label": "1"
                            },
                            {
                              "type": "aoi",
                              "left": "219",
                              "top": "-74",
                              "angle": 0,
                              "width": "144",
                              "height": "144",
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "rgba(0, 0, 0, 0.2)",
                              "label": "2"
                            },
                            {
                              "type": "aoi",
                              "left": "-219",
                              "top": "198",
                              "angle": 0,
                              "width": "144",
                              "height": "144",
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "rgba(0, 0, 0, 0.2)",
                              "label": "3"
                            },
                            {
                              "type": "aoi",
                              "left": "219",
                              "top": "198",
                              "angle": 0,
                              "width": "144",
                              "height": "144",
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "rgba(0, 0, 0, 0.2)",
                              "label": "4"
                            }
                          ],
                          "viewport": [
                            800,
                            600
                          ],
                          "files": {
                            "4.SVG": "embedded\u002F8f87e7c1b5a3b5b1e7bbbd0dc061216c291318925aa0f9f9757b60e18aa59b3e.SVG"
                          },
                          "responses": {
                            "click @1": "1",
                            "click @2": "2",
                            "click @3": "3",
                            "click @4": "4"
                          },
                          "parameters": {},
                          "messageHandlers": {},
                          "title": "Image",
                          "correctResponse": "${ parameters.correct }"
                        }
                      ]
                    }
                  },
                  {
                    "type": "lab.canvas.Screen",
                    "content": [],
                    "viewport": [
                      800,
                      600
                    ],
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Blank",
                    "timeout": "1500"
                  },
                  {
                    "type": "lab.html.Page",
                    "items": [
                      {
                        "type": "text",
                        "title": "お疲れさまでした。",
                        "content": "ヨニに関する実験はこれで終了です。"
                      },
                      {
                        "required": true,
                        "type": "html",
                        "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                        "name": ""
                      }
                    ],
                    "scrollTop": true,
                    "submitButtonText": "次へ →",
                    "submitButtonPosition": "hidden",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Thanks"
                  }
                ]
              },
              {
                "title": "STEU-Brief",
                "type": "lab.flow.Sequence",
                "parameters": {},
                "plugins": [],
                "metadata": {
                  "title": "",
                  "description": "",
                  "repository": "",
                  "contributors": ""
                },
                "files": {},
                "responses": {},
                "content": [
                  {
                    "type": "lab.html.Page",
                    "items": [
                      {
                        "type": "text",
                        "title": "続いて，感情理解の状況テストを行います。",
                        "content": "各質問では，ある状況が描写されていますので，その状況から生じる可能性が最も高い感情を5つの選択肢の中から選んでください。以下はその例です。"
                      },
                      {
                        "required": false,
                        "type": "radio",
                        "label": "クララはプレゼントを受け取りました。クララが最も抱きやすい感情は？",
                        "options": [
                          {
                            "label": "幸せ",
                            "coding": "1"
                          },
                          {
                            "label": "怒り",
                            "coding": "2"
                          },
                          {
                            "label": "恐れ",
                            "coding": "3"
                          },
                          {
                            "label": "退屈",
                            "coding": "4"
                          },
                          {
                            "label": "空腹",
                            "coding": "5"
                          }
                        ],
                        "name": "res"
                      },
                      {
                        "required": true,
                        "type": "text",
                        "content": "もしクララが幸せを感じたと思ったら，選択肢「幸せ」に印をつけ，次の問題に進みます。全部で19問あります。"
                      },
                      {
                        "required": true,
                        "type": "text",
                        "content": "「次へ」ボタンを押すと，テストが始まります。"
                      },
                      {
                        "required": true,
                        "type": "html",
                        "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                        "name": ""
                      }
                    ],
                    "scrollTop": true,
                    "submitButtonText": "次へ →",
                    "submitButtonPosition": "hidden",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Inst"
                  },
                  {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Sequence",
                    "shuffle": true,
                    "content": [
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "ゼイビアは難しい仕事を期限内に，そして予算内で完成させます。ゼイビアが最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "驚き",
                                "coding": "1"
                              },
                              {
                                "label": "誇り",
                                "coding": "2"
                              },
                              {
                                "label": "安堵",
                                "coding": "3"
                              },
                              {
                                "label": "希望",
                                "coding": "4"
                              },
                              {
                                "label": "喜び",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item2",
                        "correctResponse": "2"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "もし今の状況が続けば，デニスがまさに望んでいるように，雇用主はおそらくデニスの職場を自宅にもっと近い場所に移してくれるでしょう。デニスが最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "悩み",
                                "coding": "1"
                              },
                              {
                                "label": "喜び",
                                "coding": "2"
                              },
                              {
                                "label": "驚き",
                                "coding": "3"
                              },
                              {
                                "label": "希望",
                                "coding": "4"
                              },
                              {
                                "label": "恐れ",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item8"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "ソンは，友人が急な支払いのために他人からお金を借りたのに，実はそれほど深刻ではない目的でそのお金を使っていたことを知ります。ソンが最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "怒り",
                                "coding": "1"
                              },
                              {
                                "label": "興奮",
                                "coding": "2"
                              },
                              {
                                "label": "軽蔑",
                                "coding": "3"
                              },
                              {
                                "label": "羞恥心",
                                "coding": "4"
                              },
                              {
                                "label": "恐れ",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item9",
                        "correctResponse": "3"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "shuffle": true,
                            "name": "response",
                            "label": "チャールズは友人と映画を見るために待ち合わせをしています。その友人は到着がとても遅く，二人は映画に間に合いません。チャールズが最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "憂鬱",
                                "coding": "1"
                              },
                              {
                                "label": "不満",
                                "coding": "2"
                              },
                              {
                                "label": "怒り",
                                "coding": "3"
                              },
                              {
                                "label": "軽蔑",
                                "coding": "4"
                              },
                              {
                                "label": "悩み",
                                "coding": "5"
                              }
                            ]
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item12",
                        "correctResponse": "3"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "shuffle": true,
                            "name": "response",
                            "label": "ある人が，他人がわざと自分を傷つけたと思っています。状況を良くするためにできることはあまりありません。この当事者が最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "嫌悪",
                                "coding": "1"
                              },
                              {
                                "label": "怒り",
                                "coding": "2"
                              },
                              {
                                "label": "嫉妬",
                                "coding": "3"
                              },
                              {
                                "label": "驚き",
                                "coding": "4"
                              },
                              {
                                "label": "不安",
                                "coding": "5"
                              }
                            ]
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item14",
                        "correctResponse": "1"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "ジムの楽しみは，土曜日に子供たちと公園で遊ぶことです。今年は土曜日にスポーツの習い事があり，もう一緒に公園には行けません。ジムが最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "怒り",
                                "coding": "1"
                              },
                              {
                                "label": "悲しみ",
                                "coding": "2"
                              },
                              {
                                "label": "不満",
                                "coding": "3"
                              },
                              {
                                "label": "悩み",
                                "coding": "4"
                              },
                              {
                                "label": "羞恥心",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item16",
                        "correctResponse": "2"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "shuffle": true,
                            "name": "response",
                            "label": "メーガンは家を買おうとしています。あることが起こり，彼女は後悔しています。何が起こった可能性が最も高いでしょうか？",
                            "options": [
                              {
                                "label": "彼女は気に入っていた家を申し込まなかったので，もう遅すぎるかどうか確かめようとしている。",
                                "coding": "1"
                              },
                              {
                                "label": "彼女は思いがけず気に入った家を見つけた。",
                                "coding": "2"
                              },
                              {
                                "label": "銀行が期限内にお金を用意しなかったので，彼女は気に入った家を申し込むことができなかった。",
                                "coding": "3"
                              },
                              {
                                "label": "彼女は気に入っていた家を申し込まなかったために，今では他の人がその家を買ってしまった。",
                                "coding": "4"
                              },
                              {
                                "label": "彼女はある家を申し込んだが，それが受け入れられるかどうか待っているところだ。",
                                "coding": "5"
                              }
                            ]
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item19",
                        "correctResponse": "4"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "メアリーはデスクワークをしていました。あることが起きて，彼女はびっくりしました。何が起こった可能性が最も高いでしょうか？",
                            "shuffle": true,
                            "name": "response",
                            "options": [
                              {
                                "label": "彼女の仕事仲間がくだらない冗談を言った。",
                                "coding": "1"
                              },
                              {
                                "label": "彼女は今まで扱ったことのない新しい仕事に取り組んでいた。",
                                "coding": "2"
                              },
                              {
                                "label": "彼女は自分が予想していたのとは違う結果に気づいた。",
                                "coding": "3"
                              },
                              {
                                "label": "彼女は自分の仕事を終えられないだろうと悟った。",
                                "coding": "4"
                              },
                              {
                                "label": "彼女は普段仕事でやらない作業をしなければならなかった。",
                                "coding": "5"
                              }
                            ]
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item20",
                        "correctResponse": "3"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "ある人が，他人が自分に何か良いことが起こるように意図的に仕向けたと考えています。その人が最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "希望",
                                "coding": "1"
                              },
                              {
                                "label": "誇り",
                                "coding": "2"
                              },
                              {
                                "label": "感謝",
                                "coding": "3"
                              },
                              {
                                "label": "驚き",
                                "coding": "4"
                              },
                              {
                                "label": "安堵",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item22",
                        "correctResponse": "3"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "shuffle": true,
                            "name": "response",
                            "label": "自分の行動によって，その人は自分が到達したかった目標に到達しました。その人が最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "喜び",
                                "coding": "1"
                              },
                              {
                                "label": "希望",
                                "coding": "2"
                              },
                              {
                                "label": "安堵",
                                "coding": "3"
                              },
                              {
                                "label": "誇り",
                                "coding": "4"
                              },
                              {
                                "label": "驚き",
                                "coding": "5"
                              }
                            ]
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item24",
                        "correctResponse": "4"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "望まない状況が起こりにくくなったり，完全になくなったりすることがあります。この当事者が最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "後悔",
                                "coding": "1"
                              },
                              {
                                "label": "希望",
                                "coding": "2"
                              },
                              {
                                "label": "喜び",
                                "coding": "3"
                              },
                              {
                                "label": "悲しみ",
                                "coding": "4"
                              },
                              {
                                "label": "安堵",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item25",
                        "correctResponse": "5"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "ハサドは新しい携帯電話を使おうとしています。彼はいつもいろいろな電化製品の使い方を理解していますが，携帯電話を使いこなすことができません。ハサドが最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "悩み",
                                "coding": "1"
                              },
                              {
                                "label": "困惑",
                                "coding": "2"
                              },
                              {
                                "label": "驚き",
                                "coding": "3"
                              },
                              {
                                "label": "安堵",
                                "coding": "4"
                              },
                              {
                                "label": "不満",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item26",
                        "correctResponse": "5"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "ドリアンの友人が病気で，顔を背けたり口をふさいだりすることもなく，咳を撒き散らしています。ドリアンが最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "不安",
                                "coding": "1"
                              },
                              {
                                "label": "嫌悪",
                                "coding": "2"
                              },
                              {
                                "label": "驚き",
                                "coding": "3"
                              },
                              {
                                "label": "嫉妬",
                                "coding": "4"
                              },
                              {
                                "label": "怒り",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item27",
                        "correctResponse": "2"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "クァンと彼の妻は，その日自分たちに起こったことについて話しています。クァンを驚かせるようなことが起こりました。何が起こった可能性が最も高いでしょうか？",
                            "options": [
                              {
                                "label": "彼の妻が，通常起こらないようなことをたくさん話した。",
                                "coding": "1"
                              },
                              {
                                "label": "彼の妻が，いつも話していることとは違うことを話した。",
                                "coding": "2"
                              },
                              {
                                "label": "妻が彼に，何か悪い知らせがあるかもしれないと言った。",
                                "coding": "3"
                              },
                              {
                                "label": "彼の妻が，クァンが予想していたのとは違うことを話した。",
                                "coding": "4"
                              },
                              {
                                "label": "彼の妻が面白い話をした。",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item29",
                        "correctResponse": "4"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "働いていて不快だった上司がアルフォンソの職場を去りました。アルフォンソが最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "喜び",
                                "coding": "1"
                              },
                              {
                                "label": "希望",
                                "coding": "2"
                              },
                              {
                                "label": "後悔",
                                "coding": "3"
                              },
                              {
                                "label": "安堵",
                                "coding": "4"
                              },
                              {
                                "label": "悲しみ",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item33",
                        "correctResponse": "4"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "サラの仕事の内容が予測不可能な要因で変わってしまい，彼女が最も楽しんでいた仕事の部分ができなくなりました。サラが最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "羞恥心",
                                "coding": "1"
                              },
                              {
                                "label": "悲しみ",
                                "coding": "2"
                              },
                              {
                                "label": "怒り",
                                "coding": "3"
                              },
                              {
                                "label": "悩み",
                                "coding": "4"
                              },
                              {
                                "label": "不満",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item34",
                        "correctResponse": "2"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "レイラは最近よく眠れないのですが，その原因となるような生活の変化はありません。レイラが最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "怒り",
                                "coding": "1"
                              },
                              {
                                "label": "恐れ",
                                "coding": "2"
                              },
                              {
                                "label": "悲しみ",
                                "coding": "3"
                              },
                              {
                                "label": "悩み",
                                "coding": "4"
                              },
                              {
                                "label": "罪悪感",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item35",
                        "correctResponse": "4"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "ある人が，他人が自分に何か良いことが起きなくなるように意図的に仕向けたと考えています。しかし，同時にそれについて何らかの対処は可能だと感じています。その人が最も抱きやすい感情は？",
                            "options": [
                              {
                                "label": "怒り",
                                "coding": "1"
                              },
                              {
                                "label": "軽蔑",
                                "coding": "2"
                              },
                              {
                                "label": "悩み",
                                "coding": "3"
                              },
                              {
                                "label": "憂鬱",
                                "coding": "4"
                              },
                              {
                                "label": "不満",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item37",
                        "correctResponse": "1"
                      },
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "required": true,
                            "type": "radio",
                            "label": "マシューは今の仕事に就いて6カ月になります。彼が後悔を感じるようなことが起こりました。何が起こった可能性が最も高いでしょうか？",
                            "options": [
                              {
                                "label": "彼は希望する職種に応募しなかったので，より資格のない他の人がその職に就いたことを知った。",
                                "coding": "1"
                              },
                              {
                                "label": "彼は希望する職種に応募しなかったので，同じような職種を探し始めた。",
                                "coding": "2"
                              },
                              {
                                "label": "彼は昇進の機会がなくなってしまったことを知った。",
                                "coding": "3"
                              },
                              {
                                "label": "彼は自分が得られると思っていたポジションを得られないことを知った。",
                                "coding": "4"
                              },
                              {
                                "label": "彼は応募できたはずの職について聞いておらず，今となっては遅すぎた。",
                                "coding": "5"
                              }
                            ],
                            "shuffle": true,
                            "name": "response"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "次へ →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "item41",
                        "correctResponse": "1"
                      }
                    ]
                  },
                  {
                    "type": "lab.html.Page",
                    "items": [
                      {
                        "type": "text",
                        "title": "お疲れさまでした。",
                        "content": "これで感情理解の状況テストは終了です。"
                      },
                      {
                        "required": true,
                        "type": "html",
                        "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                        "name": ""
                      }
                    ],
                    "scrollTop": true,
                    "submitButtonText": "次へ →",
                    "submitButtonPosition": "hidden",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Thanks"
                  },
                  {
                    "title": "IRI-J",
                    "type": "lab.flow.Sequence",
                    "parameters": {},
                    "plugins": [],
                    "metadata": {
                      "title": "",
                      "description": "",
                      "repository": "",
                      "contributors": ""
                    },
                    "files": {},
                    "responses": {},
                    "content": [
                      {
                        "type": "lab.html.Page",
                        "items": [
                          {
                            "type": "text",
                            "title": "最後に，対人反応性指標というアンケートにご回答下さい。",
                            "content": "「次へ」を押した後に表示される文は，様々な状況におけるあなたの考えや気持ちについて尋ねるものです。"
                          },
                          {
                            "required": true,
                            "type": "text",
                            "content": "各項目について，どのくらいその内容が自分に当てはまると思うか，「全く当てはまらない」から「非常によく当てはまる」の5段階の間で選んで下さい。"
                          },
                          {
                            "required": true,
                            "type": "text",
                            "content": "回答する前に各項目をしっかりと読んで下さい。回答はできる限り正直にお願い致します。"
                          },
                          {
                            "required": true,
                            "type": "html",
                            "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                            "name": ""
                          }
                        ],
                        "scrollTop": true,
                        "submitButtonText": "Continue →",
                        "submitButtonPosition": "hidden",
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "Inst"
                      },
                      {
                        "type": "lab.flow.Loop",
                        "templateParameters": [
                          {
                            "question": "自分の身に起こりそうな出来事について，空想にふけることが多い。",
                            "item": "1-FS"
                          },
                          {
                            "question": "小説に登場する人物の気持ちに深く入り込んでしまう。",
                            "item": "5-FS"
                          },
                          {
                            "question": "演劇や映画を観た後は，自分が登場人物のひとりになりきっている感じがする。",
                            "item": "16-FS"
                          },
                          {
                            "question": "よい映画をみるとき，自分を物語の中心人物に置き換えることが簡単にできる。",
                            "item": "23-FS"
                          },
                          {
                            "question": "面白い物語や小説を読んでいると，その話の出来事がもし自分の身に起こったらどんな気持ちになるだろうと想像する。",
                            "item": "26-FS"
                          },
                          {
                            "question": "映画や劇をみるときはたいてい，引き込まれてしまうことはなく，客観的である。",
                            "item": "7-FSr"
                          },
                          {
                            "question": "よい本や映画にすっかり入り込んでしまうことはめったにない。",
                            "item": "12-FSr"
                          },
                          {
                            "question": "何かを決める前には，自分と意見が異なる立場のすべてに目を向けるようにしている。",
                            "item": "8-PT"
                          },
                          {
                            "question": "友達のことをよく知ろうとして，その人からどのように物事がみえているか想像する。",
                            "item": "11-PT"
                          },
                          {
                            "question": "すべての問題点には 2つの立場があると思っており，その両者に目を向けるようにしている。",
                            "item": "21-PT"
                          },
                          {
                            "question": "誰かにいらいらしているときにはたいてい，しばらくその人の身になって考えるようにしている。",
                            "item": "25-PT"
                          },
                          {
                            "question": "誰かを批判する前には，自分が批判される相手の立場だったらどう感じるか想像しようとする。",
                            "item": "28-PT"
                          },
                          {
                            "question": "他の人の視点から物事を見るのは難しいと感じることがある。",
                            "item": "3-PTr"
                          },
                          {
                            "question": "自分が正しいと思える時には，他の人の言い分を聞くようなことには時間を使わない。",
                            "item": "15-PTr"
                          },
                          {
                            "question": "自分より不運な人たちを心配し，気にかけることが多い。",
                            "item": "2-EC"
                          },
                          {
                            "question": "誰かがいいように利用されているのをみると，その人を守ってあげたいような気持ちになる。",
                            "item": "9-EC"
                          },
                          {
                            "question": "自分が見聞きした出来事に，心を強く動かされることが多い。",
                            "item": "20-EC"
                          },
                          {
                            "question": "自分は思いやりの気持ちが強い人だと思う。",
                            "item": "22-EC"
                          },
                          {
                            "question": "他の人たちが困っているのを見て，気の毒に思わないことがある。",
                            "item": "4-ECr"
                          },
                          {
                            "question": "他の人たちが不運な目にあっているのはたいてい，それほど気にならない。",
                            "item": "14-ECr"
                          },
                          {
                            "question": "誰かが不公平な扱いをされているのをみたときに，そんなにかわいそうだと思わないことがある。",
                            "item": "18-ECr"
                          },
                          {
                            "question": "非常事態では，不安で落ち着かなくなる。",
                            "item": "6-PD"
                          },
                          {
                            "question": "激しく感情的になっている場面では，何をしたらいいか分からなくなることがある。",
                            "item": "10-PD"
                          },
                          {
                            "question": "気持ちが張り詰めた状況にいると，恐ろしくなってしまう。",
                            "item": "17-PD"
                          },
                          {
                            "question": "切迫した状況では，自分をコントロールできなくなる方だ。",
                            "item": "24-PD"
                          },
                          {
                            "question": "差し迫った助けが必要な人を見ると，混乱してどうしたらいいかわからなくなる。",
                            "item": "27-PD"
                          },
                          {
                            "question": "誰かが傷つけられているのを見たとき，落ち着いていられる方だ。",
                            "item": "13-PDr"
                          },
                          {
                            "question": "緊急事態には，たいていはうまく対処できる。",
                            "item": "19-PDr"
                          }
                        ],
                        "sample": {
                          "mode": "draw-shuffle"
                        },
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {},
                        "title": "Loop",
                        "shuffleGroups": [],
                        "template": {
                          "type": "lab.html.Page",
                          "items": [
                            {
                              "required": true,
                              "type": "radio",
                              "options": [
                                {
                                  "label": "全く当てはまらない",
                                  "coding": "1"
                                },
                                {
                                  "coding": "2",
                                  "label": "あまり当てはまらない"
                                },
                                {
                                  "coding": "3",
                                  "label": "どちらとも言えない"
                                },
                                {
                                  "coding": "4",
                                  "label": "やや当てはまる"
                                },
                                {
                                  "label": "非常によく当てはまる",
                                  "coding": "5"
                                }
                              ],
                              "name": "response",
                              "label": "${ parameters.question }"
                            },
                            {
                              "required": true,
                              "type": "html",
                              "content": "\u003Cdiv class = 'content-horizontal-center'\u003E\u003Cbutton id = \"nextBtn\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
                              "name": ""
                            }
                          ],
                          "scrollTop": true,
                          "submitButtonText": "次へ →",
                          "submitButtonPosition": "hidden",
                          "files": {},
                          "responses": {
                            "": ""
                          },
                          "parameters": {},
                          "messageHandlers": {},
                          "title": "item"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Deberifing",
            "content": [
              {
                "type": "lab.html.Page",
                "items": [
                  {
                    "type": "text",
                    "title": "\u003Cspan style = \"color: tomato\"\u003E以上で，全ての測定が終了です。ありがとうございました！\u003C\u002Fspan\u003E",
                    "content": "データ収集にご協力いただき，ありがとうございました。"
                  },
                  {
                    "required": true,
                    "type": "text",
                    "content": "心理学的な測定は，質問紙（アンケート）による主観的評定と，認知課題による客観的測定に大きく分かれます。"
                  },
                  {
                    "required": true,
                    "type": "text",
                    "content": "本測定では社会的能力のうち，共感を主観的評定，他者理解能力を客観的測定によってデータ収集いたしました。"
                  },
                  {
                    "required": true,
                    "type": "text",
                    "content": "心理士／心理師を目指す人の社会的能力をはじめ，現職教員や教員志望学生の社会的能力を測定し，その分布や変動などを検出できればと考え，そのための測定手法としての有効性を調べるための測定にご協力いただいた次第です。"
                  },
                  {
                    "required": true,
                    "type": "text",
                    "content": "改めまして，今回は調査へのご協力，誠にありがとうございました。"
                  }
                ],
                "scrollTop": true,
                "submitButtonText": "To download data →",
                "submitButtonPosition": "right",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {},
                "title": "thanks_code"
              }
            ]
          }
        ]
      }
    }
  ]
})

// Let's go!
study.run()