"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require('dotenv').config();
var _a = require("openai"), Configuration = _a.Configuration, OpenAIApi = _a.OpenAIApi;
var configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
var openai = new OpenAIApi(configuration);
var getGeneratedResponse = function (user_prompt) { return __awaiter(void 0, void 0, void 0, function () {
    var pyramidal_prompt, prompt_to_provide, response, filtered_response, array_to_cleanse_from, cleaned_response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pyramidal_prompt = 'Re-write the text above to be in accordance with the "pyramid principle", which leads with the conclusion, and then provides supporting points. Write concisely and use short, clear sentences.';
                prompt_to_provide = "\n    \"\"\"\n    " + user_prompt + "\n    \"\"\"\n    " + pyramidal_prompt + "\n    ";
                console.log("The prompt to provide is:\n        " + prompt_to_provide);
                return [4 /*yield*/, openai.createCompletion({
                        model: "text-davinci-002",
                        prompt: prompt_to_provide,
                        temperature: 0.6,
                        max_tokens: 800
                    })];
            case 1:
                response = _a.sent();
                filtered_response = response.data.choices[0].text;
                array_to_cleanse_from = [
                    'The "pyramid principle" states that the conclusion should be stated first, followed by the supporting points.',
                    'The "pyramid principle" states that the conclusion should be stated first, and then the supporting points. In other words, the conclusion should be at the top of the pyramid, with the supporting points below.',
                    'The "pyramid principle" states that the conclusion should be stated first, and then the supporting points. In other words, start with the conclusion, and then provide the supporting points. This is how the text would look if it were written in accordance with the "pyramid principle":',
                    'The "pyramid principle" states that the conclusion should be stated first, and then the supporting points.'
                ];
                cleaned_response = function (filtered_response, array_to_cleanse_from) {
                    for (var i = 0; i < array_to_cleanse_from.length; i++) {
                        if (filtered_response.includes(array_to_cleanse_from[i])) {
                            filtered_response = filtered_response.replace(array_to_cleanse_from[i], '');
                        }
                    }
                    return filtered_response;
                };
                return [2 /*return*/, filtered_response];
        }
    });
}); };
exports["default"] = getGeneratedResponse;
