const responseCleaner = require('../response').responseCleaner;

const response_text = 'According to the pyramid principle, good startup ideas are well developed, multi-year plans that contemplate many possible paths according to how the world changes. Balaji Srinivasan calls this the idea maze.'

const starting_trigger_phrase = 'The "pyramid principle" states that'

const trigger_phrase_ending = 'Jerry Seinfeld is a very bad man.'

const array_to_cleanse_from = [
    // Common bad second sentences
    'In other words, start with the answer, and then provide the evidence',
    'In other words, the conclusion should be at the top of the pyramid, with the supporting points below',
    'In other words, start with the conclusion, and then provide the supporting points. This is how the text would look if it were written in accordance with the "pyramid principle:"'
]

// Test 1: Test that responseCleaner strips out the offending starting phrase.
test('responseCleaner returns the correct response', () => {
    let response = starting_trigger_phrase + trigger_phrase_ending + response_text

  expect(responseCleaner(response_text, starting_trigger_phrase, array_to_cleanse_from))
  .toBe(response_text);
}   );  


