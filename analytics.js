import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient();

async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    property: 'properties/484440787', // Replace with your GA4 property ID
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        stringFilter: { matchType: 'EXACT', value: 'app_remove' }
      }
    }
  });

  console.log('Event count:', response.rows);
}

runReport();
