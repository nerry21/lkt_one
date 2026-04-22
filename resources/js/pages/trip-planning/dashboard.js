function parseInitialState() {
    const element = document.getElementById('trip-planning-initial-state');

    if (!element) {
        return {
            target_date: null,
            trips: [],
            statistics: [],
        };
    }

    try {
        return JSON.parse(element.textContent || '{}');
    } catch (error) {
        return {
            target_date: null,
            trips: [],
            statistics: [],
        };
    }
}

export default async function initTripPlanningDashboardPage() {
    const page = document.querySelector('[data-trip-planning-page]');

    if (!page) {
        return;
    }

    parseInitialState();
}
