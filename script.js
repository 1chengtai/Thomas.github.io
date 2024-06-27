function showPage(pageId) {
    // 获取所有页面元素
    const pages = document.querySelectorAll('.page');
    
    // 遍历所有页面元素，移除 active 类
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // 将指定页面设为 active 类
    document.getElementById(pageId).classList.add('active');
}

function appendToDisplay(value) {
    // 将按钮的值追加到显示器上
    document.getElementById('display').value += value;
}

function clearDisplay() {
    // 清空显示器
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        // 尝试计算显示器上的表达式并显示结果
        const display = document.getElementById('display');
        display.value = eval(display.value);
    } catch (e) {
        // 如果出现错误，显示“错误”信息
        display.value = '错误';
    }
}

// 初始时显示履历页面
document.addEventListener('DOMContentLoaded', () => {
    showPage('resume');
});
//音樂播放器
const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.volume = 0;
    audioPlayer.addEventListener('ended',() =>{
        audioPlayer.currentTime = 0;
        audioPlayer.play();
})



/**點餐**/
function submitOrder() {
    const burgerQuantity = parseInt(document.getElementById('quantity-burger').value);
    const friesQuantity = parseInt(document.getElementById('quantity-fries').value);
    const cokeQuantity = parseInt(document.getElementById('quantity-coke').value);
    const totalAmount = burgerQuantity * 50 + friesQuantity * 30 + cokeQuantity * 20;

    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    if (burgerQuantity > 0) {
        const listItem = document.createElement('li');
        listItem.textContent = `漢堡 x ${burgerQuantity}`;
        orderList.appendChild(listItem);
    }

    if (friesQuantity > 0) {
        const listItem = document.createElement('li');
        listItem.textContent = `薯條 x ${friesQuantity}`;
        orderList.appendChild(listItem);
    }

    if (cokeQuantity > 0) {
        const listItem = document.createElement('li');
        listItem.textContent = `可樂 x ${cokeQuantity}`;
        orderList.appendChild(listItem);
    }

    document.getElementById('total-amount').textContent = totalAmount;
}
/*fetch */
document.getElementById('exchange-button').addEventListener('click', fetchExchangeRate);
const apiKey = '48d76f0a2b3d62a6497ed6ae';
const url = 'https://v6.exchangerate-api.com/v6/48d76f0a2b3d62a6497ed6ae/latest/TWD';
async function fetchExchangeRate() {
    try {
      console.log('Fetching data...');
      const response = await fetch(url);
      console.log('Response received:', response);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      console.log('Data fetched successfully:', data);
  
      // 將 USD 轉換為 JPY
      const exchangeRate = data.conversion_rates.JPY;
      
      // 獲取用戶輸入的金額
      const amount = parseFloat(document.getElementById('amount').value);
      if (isNaN(amount)) {
        document.getElementById('result').value = '請輸入有效的金額';
        return;
      }
      
      // 計算轉換後的金額
      const convertedAmount = (amount * exchangeRate).toFixed(2);
      
      // 顯示轉換後的金額
      document.getElementById('result').value = `${amount} 台幣 = ${convertedAmount} 日圓`;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      document.getElementById('result').value = 'Error fetching data';
    }
  }

let wordsJP = [];
let wordsPY = [];

// 使用 fetch API 來加載 JSON 文件
Promise.all([
    fetch('word2.json').then(response => response.json()),
    fetch('word.json').then(response => response.json())
])
.then(data => {
    wordsJP = data[0];
    wordsPY = data[1];
    setRandomWord();
})
.catch(error => console.error('Error loading words:', error));

function setRandomWord() {
    const wordToMatch = document.getElementById("word-to-match");
    const randomIndex = Math.floor(Math.random() * wordsJP.length);
    wordToMatch.innerText = wordsJP[randomIndex];
    wordToMatch.dataset.index = randomIndex; // 保存索引以便後續檢查
}

function checkWord() {
    const wordToMatch = document.getElementById("word-to-match");
    const userInput = document.getElementById("user-input").value;
    const result = document.getElementById("result");
    const currentIndex = wordToMatch.dataset.index;

    if (userInput === wordsPY[currentIndex]) {
        result.innerText = "恭喜！你輸入的拼音正確！";
        result.style.color = "green";
        document.getElementById("user-input").value = '';
        setRandomWord(); // 設置一個新詞語
    } else {
        result.innerHTML = `錯誤！請再試一次。 正確答案是: ${wordsPY[currentIndex]}`;
        result.style.color = "red";
    }
    /*console.log('wordToMatch:', wordToMatch);
console.log('userInput:', userInput);
console.log('currentIndex:', currentIndex);
console.log('expectedPY:', wordsPY[currentIndex]);*/
}
document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkWord();
    }
});
  