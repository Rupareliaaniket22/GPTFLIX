import { QWEN_AI_API_OPTIONS } from '../utils/Constants';

const useGetMovieRecommendation = () => {
  async function getMovieSuggestions(query) {
    try {
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${QWEN_AI_API_OPTIONS}`, // Ensure this is the API key
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'qwen/qwq-32b:free',
            messages: [
              {
                role: 'system',
                content: 'You are an AI movie recommendation assistant.',
              },
              { role: 'user', content: query }, // User's input
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'No recommendations found'; // Adjust based on API response
    } catch (error) {
      console.error('Error fetching movie suggestions:', error);
      return null;
    }
  }

  return getMovieSuggestions; // Return function for components
};

export default useGetMovieRecommendation;
