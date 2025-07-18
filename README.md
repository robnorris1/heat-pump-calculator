# Heat Pump Calculator

A TypeScript application that calculates heat pump recommendations and costs for housing quotes based on property data and weather information.

## Features
- Calculates heat loss for properties using floor area, heating factor, and insulation factor
- Integrates with weather API to get degree days for different regions
- Recommends appropriate heat pump based on power requirements
- Calculates total costs including VAT
- Handles API failures gracefully with appropriate warning messages
- Clean separation of concerns with utils, types, and business logic

## Setup

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   WEATHER_API_KEY=your-api-key-here
   WEATHER_API_BASE_URL=api-url-here
   ```
   Replace `your-api-key-here` and `api-url-here` with the actual API key and URL provided in the tec test requirements.

## Running the Application

```bash
# Install dependencies
npm i

# Build and run 
npm run dev

# Run tests
npm test
```

## Project Structure

```
src/
├── types.ts          # TypeScript interfaces
├── utils.ts          # Business logic
├── api-client.ts     # Weather API integration
├── calculator.ts     # Main heat pump calculator
└── index.ts          # Entry point

tests/
└── utils.test.ts     # Unit tests for business logic

data/
├── houses.json       # Property data
└── heatPumpData.json # Heat pump specifications
```


## API Integration

The weather API is intentionally unstable (as mentioned in the requirements) and may return various HTTP status codes:
- `200 OK`
- `404 Not Found` 
- `418 I'm a teapot` 
- `500 Internal Server Error` 

The application handles all these cases gracefully and continues processing other properties.

## Testing

The project includes unit tests for the core business logic:
- Heat loss calculations
- Heat pump selection logic
- Cost calculations with VAT

## What I Would Do With More Time

### Immediate Improvements
- Add integration tests with mocked API responses
- Implement retry logic for failed API calls
- Add input validation for JSON data files
- Create a configuration file for VAT rate and other constants

### Enhanced Features
- Add logging framework (Winston) for better error tracking
- Implement caching for API responses to reduce calls
- Add support for different output formats (JSON, CSV)
- Create a CLI interface with command-line arguments

### Code Quality
- Add ESLint and Prettier for code formatting
- Implement Husky for pre-commit hooks
- Add more comprehensive test coverage
- Implement proper error classes instead of generic Error

## Design Decisions

1. **String Formatting**: Chose simple array-based string building over complex template literals for better readability
2. **Error Handling**: Used try-catch with null returns rather than throwing errors up the stack
3. **API Client**: Implemented interface-based design for easy testing and potential mocking
4. **Business Logic**: Separated into pure functions for easier testing and reusability
5. **Testing Strategy**: Focused on unit testing business logic rather than integration testing given time constraints

## Time Investment

This project was completed in 2 - 3 hours, focusing on:
- Prework in Postman testing the API and response structure (20 minutes)
- Core functionality implementation (70 minutes)
- Error handling and API integration (20 minutes)
- Testing and documentation (30 minutes)
