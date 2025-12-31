const yahooFinance = require('yahoo-finance2').default;

async function test() {
  try {
    const quote = await yahooFinance.quote('AAPL');
    console.log('Quote:', quote);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
