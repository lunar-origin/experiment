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
      "filePrefix": "study",
      "path": undefined
    }
  ],
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
          "content": "「次へ」ボタンを押すと，実験が始まります。"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "次へ →",
      "submitButtonPosition": "right",
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
      "timeline": []
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
      "title": "Screen",
      "timeout": "1000"
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
          "src": "${ this.files[\"4.SVG\"] }"
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
      "title": "Trial",
      "correctResponse": "2"
    }
  ]
})

// Let's go!
study.run()