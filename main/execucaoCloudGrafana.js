/**
 * Beneficios
 * 1. Escalabilidade - 
 * 2. Flexibilidade geográfica
 * 3. Confiança nos Resultados
 */

import { check, sleep } from "k6";
import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        checks: ['rate > 0.95' ],
    },
    ext:{
        loadimpact:{
            projectID:'3710767',
            name:'Estudo K6'
        }
    }
}
export default function () {
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/';

    const response = http.get(BASE_URL);

    check(response, {
        'Status code é 200' : (statusCode) => statusCode.status === 200
    });
    sleep(1);
}

export function handleSummary(data) {
    return{
        "index.html" : htmlReport(data),
    };
}