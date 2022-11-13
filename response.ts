require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const responseCleaner = (
  response: string,
  offending_starter_phrase: string,
  array_to_cleanse_from: Array<string>
): string => {
  if (response.includes(offending_starter_phrase)) {
    console.log('Starts with the offending phrase');
    let start = response.indexOf('.') + 1;
    let end = response.length;
    return response.substring(start, end);
  } else {
    console.log('Does not start with the offending phrase');
    for (let i = 0; i < array_to_cleanse_from.length; i++) {
      if (response.includes(array_to_cleanse_from[i])) {
        response = response.replace(array_to_cleanse_from[i], '');
      }
    }
    return response;
  }
};

const getGeneratedResponse = async (user_prompt: string): Promise<string> => {
  let pyramidal_prompt =
    'Re-write the text above to be in accordance with the "pyramid principle", which leads with the conclusion, and then provides supporting points. Write concisely and use short, clear sentences.';

  let prompt_to_provide = `
    """
    ${user_prompt}
    """
    ${pyramidal_prompt}
    `;
  // console.log(
  //     `The prompt to provide is:
  //     ${prompt_to_provide}`
  // )

  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: prompt_to_provide,
    temperature: 0.6,
    max_tokens: 800,
  });

  let response_text = response.data.choices[0].text;

  let starting_phrase = 'The "pyramid principle" states that';

  let array_to_cleanse_from: Array<string> = [
    // Common bad second sentences
    'In other words, start with the answer, and then provide the evidence',
    'In other words, the conclusion should be at the top of the pyramid, with the supporting points below',
    'In other words, start with the conclusion, and then provide the supporting points. This is how the text would look if it were written in accordance with the "pyramid principle:"',
  ];

  let clean_response = responseCleaner(
    response_text,
    starting_phrase,
    array_to_cleanse_from
  );

  return clean_response;
};

export { getGeneratedResponse, responseCleaner };
