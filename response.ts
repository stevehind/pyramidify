require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface completion {
    id: string,
    object: string,
    created: number,
    model: string,
    choices: Array<any>
}

const getGeneratedResponse = async (user_prompt: string): Promise<completion> => {

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

    let cleaned_response = filtered_response.replace('The "pyramid principle" states that the conclusion should be stated first, and then the supporting points. In other words, the conclusion should be at the top of the pyramid, with the supporting points below.', '')

    return cleaned_response
}

export default getGeneratedResponse