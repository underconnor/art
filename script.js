document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('image-container');
    let images = [];
    const maxImages = 60;

    function placeImage(src) {
        const img = document.createElement('img');
        img.src = src;
        const size = Math.random() * (40 - 10) + 10; // 이미지 크기 10vw에서 40vw 사이로 랜덤 설정
        img.style.width = `${size}vw`;
        img.style.position = 'absolute';
        img.style.top = `${Math.random() * 80}vh`;
        img.style.left = `${Math.random() * 80}vw`;
        img.classList.add('image');
        container.appendChild(img);

        setTimeout(() => { img.remove(); }, 40000); // 20초 후 이미지 제거
    }

    function cycleImages() {
        setInterval(() => {
            if (container.children.length < maxImages) {
                const randomIndex = Math.floor(Math.random() * images.length);
                placeImage(images[randomIndex]);
            }
        }, 1000);
    }

    function adjustImagePosition(event) {
        const movementIntensity = 50; // 움직임 강도 조절
        Array.from(container.children).forEach(img => {
            const imgRect = img.getBoundingClientRect();
            const imgX = imgRect.left + imgRect.width / 2;
            const imgY = imgRect.top + imgRect.height / 2;
            let xMovement = 0;
            let yMovement = 0;

            if (event.type === 'mousemove') {
                // 마우스 이벤트 처리
                const angleDeg = Math.atan2(imgY - event.clientY, imgX - event.clientX) * 180 / Math.PI;
                xMovement = Math.cos(angleDeg * Math.PI / 180) * movementIntensity;
                yMovement = Math.sin(angleDeg * Math.PI / 180) * movementIntensity;
            } else if (event.type === 'deviceorientation') {
                // 기기 기울임 감지 처리
                xMovement = event.gamma; // 좌우 기울기
                yMovement = event.beta;  // 전후 기울기
            }

            img.style.transform = `translate(${xMovement}px, ${yMovement}px)`;
        });
    }

    function animateImages() {
        Array.from(container.children).forEach(img => {
            // 원래 위치 저장
            const originalPosition = img.getAttribute('data-original-position').split(' ');
            const originalTop = originalPosition[0];
            const originalLeft = originalPosition[1];

            // 랜덤 방향으로 이동
            const moveX = (Math.random() - 0.2) * 1000;
            const moveY = (Math.random() - 0.2) * 1000;
            img.style.transition = 'transform 0.5s';
            img.style.transform = `translate(${moveX}px, ${moveY}px)`;

            // 설정된 시간 후 원래 위치로 복귀
            setTimeout(() => {
                img.style.transition = 'transform 0.5s';
                img.style.transform = 'translate(0, 0)';
            }, 500);
        });
    }

    function initialImagePlacement() {
        for (let i = 0; i < 10; i++) { // 초기에 10개의 이미지를 생성
            const randomIndex = Math.floor(Math.random() * images.length);
            placeImage(images[randomIndex]);
        }
    }


    // 초기 이미지 리스트 설정
    images = [
        'images/image1.jpg',
        'images/image2.jpg',
        'images/image3.jpg',
        'images/image4.jpg',
        'images/image5.jpg',
        'images/image6.jpg',
        'images/image7.jpg',
        'images/image8.jpg',
        'images/image9.jpg',
        'images/image10.jpg',
        'images/image11.jpg',
        // ... 추가 이미지 경로
    ];

    initialImagePlacement();
    cycleImages();
    document.addEventListener('mousemove', adjustImagePosition);
    window.addEventListener('deviceorientation', adjustImagePosition);
    document.addEventListener('click', animateImages);
});
