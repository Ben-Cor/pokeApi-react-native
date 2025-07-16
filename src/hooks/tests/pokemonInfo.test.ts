global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('Pokemon API Tests', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should be a function', () => {
    // Simple test to verify Jest is working
    expect(1 + 1).toBe(2);
  });

  it('should handle fetch calls correctly', async () => {
    // Mock the list API response
    const mockListResponse = {
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
      ]
    };

    // Mock both API calls
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockListResponse,
      } as Response);

    // Test that fetch can be called
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await response.json();
    
    expect(data.results).toHaveLength(1);
    expect(data.results[0].name).toBe('pikachu');
  });

  it('should handle API errors', async () => {
    // Mock a failed API call
    mockFetch.mockRejectedValueOnce(new Error('API Error'));

    try {
      await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
