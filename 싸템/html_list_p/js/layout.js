document.addEventListener('DOMContentLoaded', () => {
	// 검색창, 기타 header 레이어
	if (document.querySelector('.header_search')) {
		function searchLayerHandlig (e) {
			// 상위 부모가 검색창이 아닌경우 검색창을 닫고 이벤트 제거
			// 클릭시 검색 외부 클릭인지 감지함을 의미
			// console.log('search click find is running');
			if (e.target.closest('.header_search') == null) {
				document.querySelector('body').classList.remove('m_hold');
				document.querySelector('.header_search').classList.remove('show');
				document.removeEventListener('click', searchLayerHandlig, {capture: true});
			}
		}
		function searchTextEvt() {
			// console.log('bind event');
			// 텍스트 문구가 있는경우 창 활성화
			if (document.querySelector('.header_search').classList.contains('show')) {
				// 이미 활성화된 경우 작동X
				return false;
			} else {
				// 활성화 상태가 아닌경우에만 활성화
				// + 포커스가 나간 상태에서 클릭스 창 비활성
				document.querySelector('.header_search').classList.add('show');
				document.querySelector('body').classList.add('m_hold');
				document.addEventListener('click', searchLayerHandlig, {capture: true});
			}
		}
		// 이벤트 트리거
		if (document.querySelector('.sec_ipt input')) {
			document.querySelector('.sec_ipt input').addEventListener('click', searchTextEvt);
		}
		// 모바일 닫기 이벤트
		document.querySelector('.header_search .layer_close').addEventListener('click', function() {
			document.querySelector('.header_search').classList.remove('show');
			document.querySelector('body').classList.remove('m_hold');
		});

		// 검색전 탭
		document.querySelectorAll('.t_before_tab > button').forEach((e, idx) => {
			e.addEventListener('click', () => {
				document.querySelectorAll('.t_before_tab > button').forEach((e) => {
					e.classList.remove('on');
				});
				document.querySelectorAll('.t_before > .sec').forEach((e) => {
					e.classList.remove('on');
				});
				e.classList.add('on');
				document.querySelectorAll('.t_before > .sec')[idx].classList.add('on');
			})
		});
	}

	if (document.querySelector('#sidebar')) {
		document.querySelector('.side_open_wrap').addEventListener('click', () => {
			document.querySelector('#sidebar').classList.toggle('on');
		});
	}

	if (document.querySelector('#sidemenu')) {
		document.querySelectorAll('.side_menu_btn').forEach((el) => {
			el.addEventListener('click', () => {
				document.querySelector('#sidemenu').classList.toggle('visible');
				document.querySelector('body').classList.toggle('sideopen');
			});
		});
	}
});