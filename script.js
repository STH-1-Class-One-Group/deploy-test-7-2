// 1. 페이지 전환 함수
function showPage(pageId) {
    // 모든 페이지에서 active 클래스 제거
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    // 대상 페이지 활성화
    const target = document.getElementById(pageId);
    if(target) {
        target.classList.add('active');
    }

    // 사이드바 제어
    const sidebar = document.getElementById('main-sidebar');
    if (pageId === 'timer-page') {
        sidebar.style.display = 'none';
    } else {
        sidebar.style.display = 'flex';
    }
}

// 2. 카운트다운 (2027년 3월 14일 기준)
const targetDate = new Date("March 14, 2027 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    const clockEl = document.getElementById("clock");
    if(clockEl) {
        clockEl.innerHTML = `${d}d ${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    }
}

// 3. 댓글 시스템
function addComment() {
    const input = document.getElementById('comment-input');
    if (!input.value.trim()) return;

    const comments = JSON.parse(localStorage.getItem('woozi_comments') || '[]');
    comments.unshift({ text: input.value, date: new Date().toLocaleString() });
    localStorage.setItem('woozi_comments', JSON.stringify(comments));
    
    input.value = '';
    loadComments();
}

function loadComments() {
    const list = document.getElementById('comment-list');
    if(!list) return;
    const comments = JSON.parse(localStorage.getItem('woozi_comments') || '[]');
    list.innerHTML = comments.map(c => `
        <div class="comment-item">
            <p>${c.text}</p>
            <small style="color:#999">${c.date}</small>
        </div>
    `).join('') || '<p>첫 응원을 남겨보세요!</p>';
}

// 초기 실행
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    loadComments();
});