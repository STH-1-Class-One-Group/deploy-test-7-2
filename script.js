function showPage(pageId) {
    // 모든 페이지 끄기
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });

    const target = document.getElementById(pageId);
    if (!target) return;

    target.classList.add('active');
    
    // 사이드바 제어 및 디스플레이 방식 분기
    const sidebar = document.getElementById('main-sidebar');
    if (pageId === 'timer-page') {
        sidebar.style.display = 'none';
        target.style.display = 'flex'; // 타이머만 중앙 정렬 flex
    } else {
        sidebar.style.display = 'flex';
        target.style.display = 'block'; // 나머지는 일반 박스
    }
}

// [삭제 기능 포함] 댓글 시스템
function addComment() {
    const input = document.getElementById('comment-input');
    if (!input.value.trim()) return;
    const comments = JSON.parse(localStorage.getItem('woozi_comments') || '[]');
    comments.unshift({ text: input.value, date: new Date().toLocaleString() });
    localStorage.setItem('woozi_comments', JSON.stringify(comments));
    input.value = '';
    loadComments();
}

function deleteComment(index) {
    if(confirm("이 응원을 삭제하시겠습니까?")) {
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

// 초기화
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
window.onload = loadComments;