// 2026년 2월 식단 데이터 (업로드해주신 이미지 기준)
const mealData = {
    // 1주차
    "2026-02-01": { menu: "중식: 낙지삼겹새우볶음 / 석식: 고추장돼지불고기" },
    "2026-02-02": { menu: "중식: 오리불고기 / 석식: 탕수육" },
    "2026-02-03": { menu: "중식: 김치순살닭볶음탕 / 석식: 가츠동" },
    "2026-02-04": { menu: "중식: 소고기비비밤 / 석식: 고추잡채&꽃빵" },
    "2026-02-05": { menu: "중식: 백순대볶음 / 석식: 지파이" },
    "2026-02-06": { menu: "중식: 가자미순살구이 / 석식: 주꾸미고구마떡볶음" },
    "2026-02-07": { menu: "조식: 불고기버거 / 중식: 사골곰탕" },

    // 2주차
    "2026-02-08": { menu: "중식: 콩나물불고기 / 석식: 닭볶음탕" },
    "2026-02-09": { menu: "중식: 들깨돼지국밥 / 석식: 돼지고기춘장볶음" },
    "2026-02-10": { menu: "중식: 삼치순살구이 / 석식: 유산슬덮밥" },
    "2026-02-11": { menu: "중식: 기사식당돼지불백 / 석식: 나가사끼짬뽕국" },
    "2026-02-12": { menu: "중식: 낙지삼겹새우볶음 / 석식: 에그카츠&돈까스" },
    "2026-02-13": { menu: "중식: 비엔나데리야끼볶음 / 석식: 볼케이노닭조림" },
    "2026-02-14": { menu: "중식: 핫도그&소떡소떡 / 석식: 제육덮밥" },

    // 3주차
    "2026-02-15": { menu: "중식: 들깨돼지불고기 / 석식: 시래기감자탕" },
    "2026-02-16": { menu: "중식: 순살안동찜닭 / 석식: 순살족발&모둠쌈" },
    "2026-02-17": { menu: "조식: 소고기떡국 (설날) / 중식: 꼬리곰탕" },
    "2026-02-18": { menu: "중식: 동파육 / 석식: 누들떡볶이" },
    "2026-02-19": { menu: "중식: 그린빈삼겹살볶음 / 석식: 수제후라이드치킨" },
    "2026-02-20": { menu: "중식: 간장소불고기 / 석식: 타코야끼" },
    "2026-02-21": { menu: "조식: 햄치즈버거 / 중식: 바베큐닭살조림" },

    // 4주차
    "2026-02-22": { menu: "중식: 사골순대국 / 석식: 간장돼지불고기" },
    "2026-02-23": { menu: "중식: 갈치순살구이 / 석식: 새우튀김덮밥" },
    "2026-02-24": { menu: "중식: 훈제삼겹살 / 석식: 불고기크로켓" },
    "2026-02-25": { menu: "중식: 주꾸미치즈떡볶음 / 석식: 닭고기야채조림" },
    "2026-02-26": { menu: "중식: 돼지고기청경채볶음 / 석식: 갈비탕" },
    "2026-02-27": { menu: "중식: 불향삼겹오징어볶음 / 석식: 훈제오리볶음" },
    "2026-02-28": { menu: "중식: 핫도그&치킨스테이크 / 석식: 쇠고기덮밥" }
};

let currentBaseDate = new Date(); // 오늘 날짜 기준

function changeWeek(direction) {
    currentBaseDate.setDate(currentBaseDate.getDate() + (direction * 7));
    renderWeeklyCalendar();
}

function renderWeeklyCalendar() {
    const container = document.getElementById('weekly-calendar');
    const title = document.getElementById('week-title');
    
    // 이번 주의 일요일 찾기
    const sunday = new Date(currentBaseDate);
    sunday.setDate(currentBaseDate.getDate() - currentBaseDate.getDay());

    title.innerText = `${sunday.getMonth() + 1}월 ${Math.ceil(sunday.getDate() / 7)}주차 식단`;

    let html = '';
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = 0; i < 7; i++) {
        const date = new Date(sunday);
        date.setDate(sunday.getDate() + i);
        const dateStr = `2026-02-${date.getDate().toString().padStart(2, '0')}`;
        const meal = mealData[dateStr] ? mealData[dateStr].menu : "식단 정보 없음";

        html += `
            <div class="calendar-day">
                <div class="day-number">${dayNames[i]} (${date.getDate()})</div>
                <div class="meal-content">${meal}</div>
            </div>
        `;
    }
    container.innerHTML = html;
}

// 페이지 로드 시 실행
window.onload = () => { renderWeeklyCalendar(); };