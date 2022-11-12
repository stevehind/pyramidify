require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getGeneratedResponse = async (user_prompt: string): Promise<string> => {

    let pyramidal_prompt = 'Re-write the text above to be in accordance with the "pyramid principle", which leads with the conclusion, and then provides supporting points. Write concisely and use short, clear sentences.'

    let prompt_to_provide = `
    """
    ${user_prompt}
    """
    ${pyramidal_prompt}
    `
    console.log(
        `The prompt to provide is:
        ${prompt_to_provide}`
    )

    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt_to_provide,
        temperature: 0.6,
        max_tokens: 800,
    });

    let filtered_response = response.data.choices[0].text

    let array_to_cleanse_from: Array<string> = [
        'The "pyramid principle" states that the conclusion should be stated first, followed by the supporting points.',
        'The "pyramid principle" states that the conclusion should be stated first, and then the supporting points. In other words, the conclusion should be at the top of the pyramid, with the supporting points below.'
    ]

    // function that checks whether filtered_response contains any of the strings in array_to_cleanse_from and if it does, replaces them with '' and returns the updated response
    const cleaned_response = (filtered_response: string, array_to_cleanse_from: Array<string>): string => {
        for (let i = 0; i < array_to_cleanse_from.length; i++) {
            if (filtered_response.includes(array_to_cleanse_from[i])) {
                filtered_response = filtered_response.replace(array_to_cleanse_from[i], '')
            }
        }
        return filtered_response
    }

    return filtered_response
}

export default getGeneratedResponse