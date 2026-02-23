function showPage(pageId) {
    // 모든 페이지 요소를 찾아서 active를 빼고 아예 안 보이게(none) 만듭니다.
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none'; // [해결] 이 코드가 있어야 배경에서 사라집니다.
    });

    const target = document.getElementById(pageId);
    if (!target) return;

    target.classList.add('active');

    // 사이드바와 페이지별 출력 방식 설정
    const sidebar = document.getElementById('main-sidebar');
    if (pageId === 'timer-page') {
        sidebar.style.display = 'none';
        target.style.display = 'flex'; // 타이머만 중앙 정렬 flex
    } else {
        sidebar.style.display = 'flex';
        target.style.display = 'block'; // 일반 페이지는 block
    }
}

// 메인 클릭 시 이동 함수 (이미 있으면 유지, 없으면 추가)
function goToMeal() {
    showPage('meal-page');
}
// 2. 카운트다운 로직 (생략 없이 유지)
const targetDate = new Date("March 14, 2027 00:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);
    const clockEl = document.getElementById("clock");
    if(clockEl) clockEl.innerHTML = `${d}d ${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}
setInterval(updateCountdown, 1000);

// 3. 댓글 삭제 기능 (유지)
function deleteComment(index) {
    if(confirm("이 응원을 삭제할까요?")) {
        let comments = JSON.parse(localStorage.getItem('woozi_comments') || '[]');
        comments.splice(index, 1);
        localStorage.setItem('woozi_comments', JSON.stringify(comments));
        loadComments();
    }
}

function loadComments() {
    const list = document.getElementById('comment-list');
    if(!list) return;
    const comments = JSON.parse(localStorage.getItem('woozi_comments') || '[]');
    list.innerHTML = comments.map((c, index) => `
        <div class="comment-item">
            <button class="delete-btn" onclick="deleteComment(${index})">삭제</button>
            <p>${c.text}</p>
            <small style="color:#aaa">${c.date}</small>
        </div>
    `).join('');
}

// 페이지가 처음 로딩될 때 저장된 댓글을 화면에 뿌려줍니다.
window.onload = function() {
    loadComments();
    // 만약 식단표 렌더링도 필요하다면 여기에 추가
    if(typeof renderWeeklyCalendar === 'function') renderWeeklyCalendar();
};