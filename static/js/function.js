var INDEX1 = 0;
var INDEX2 = 0;

//menu
function getListMenu(type) {
  var menu = {
    makanan: [
      'Nasi Goreng',
      'Indomie Goreng',
      'Nasi Ayam',
      'Ayam Goreng',
      'Ayam Bakar',
      'Ayam Rica-Rica',
      'Ayam Kecap',
      'Ayam Sambal',
      'Ayam Rendang',
      'Ayam Gulai',
      'Cumi Saus Tiram',
      'Cumi Sambal',
      'Cumi Bakar',
      'Sup Iga',
      'Iga Bakar',
      'Daging Rendang',
      'Daging Balado',
      'Daging Gulai',
      'Chicken Katsu',
      'Chicken Steak',
      'Wagyu Steak',
      'Popcorn Chicken',
      'Salmon Teriyaki',
      'Baked Salmon',
      'Crispy Calamari',
  ],
    minuman: [
      'Jus Alpukat',
      'Jus Anggur',
      'Jus Apel',
      'Jus Apricot',
      'Jus Belimbing',
      'Jus Buah Naga',
      'Jus Bluberi',
      'Jus Jambu',
      'Jus Jeruk',
      'Jus Kiwi',
      'Jus Leci',
      'Jus Mangga',
      'Jus Manggis',
      'Jus Melon',
      'Jus Nanas',
      'Jus Pisang',
      'Jus Peach',
      'Jus Pepaya',
      'Jus Semangka',
      'Jus Sirsak',
      'Jus Stroberi',
      'Air Mineral',
      'Milkshake',
      'Fruit Tea',
      'Latte',
      'Cappuccino',
      'Macchiato',
      'Ice Blend',
      'Iced Tea',
      'Ice Chocolate',
      'Hot Chocolate',
      'Hot Tea',
      'Green Tea Float',
      'Berry Float',
      'Mocha Float'
  ],
    sidedish: [
      'Burger',
      'Pizza',
      'La Pasta',
      'Spagheti',
      'Salad',
      'Chocolate Cake',
      'Green Tea Cake',
      'Tiramisu Cake',
      'Coffee Cake',
      'Vanilla Cake',
      'Cheese Cake',
      'Red Velvet Cake',
      'Berry Cake',
      'Cupcake',
      'Pancake',
      'Brownies',
      'Crepes',
      'Croffle',
      'Glazed Donuts',
      'Roti Bakar',
      'Mochi',
      'Ice Cream',
      'Gelato',
      'Pudding',
  ],
  };
  
  if (type === "makanan") {
    return menu.makanan;
  } else if (type === "minuman") {
    return menu.minuman;
  } else if (type === "sidedish") {
    return menu.sidedish;
  } else {
    return [];
  }
}


$("#chat-submit1").click(function (e) {
    e.preventDefault();
    var msg = $("#chat-input1").val();
    handleChatSubmit(msg);
});

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
  const speechButton = $('#speechButton');        
  
  recognition.lang = 'id-ID';
  recognition.continuous = false;
  
  speechButton.on('click', () => {
    recognition.start();
    recordingAnimation();
  });
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    $('.recording-animate').remove();
    handleChatSubmit(transcript);
  };
  
  recognition.onerror = (event) => {          
    $('.recording-animate').remove();
    generate_message1('Error occurred during speech recognition.', 'self');
  };
} else {
  $('.recording-animate').remove();
  alert('Speech recognition is not supported in this browser.');
}

function generate_message1(msg, type) {
    INDEX1++;
    var str = "";
    str += "<div id='cm-msg1-" + INDEX1 + "' class=\"row chat-msg" + type + "\">";
    str += "<div class=\"cm-msg-text1 col-md\">";
    str += msg;
    str += "<\/div><\/div>";

    // Tampilkan pesan dengan animasi 
    $(".chat-logs1").append(str);
    $("#cm-msg1-" + INDEX1).hide().fadeIn(300);

    // Jika pesan dikirim dari HP 1, hapus text pada input text HP 1
    if (type == 'self') {
        $("#chat-input1").val('');
    }

    // Scroll ke pesan terakhir
    $(".chat-logs1").stop().animate(
        {
            scrollTop: $(".chat-logs1")[0].scrollHeight
        }, 1000);
}

function generate_message2(msg, type) {
    INDEX2++;
    var str = "";
    str += "<div id='cm-msg2-" + INDEX2 + "' class=\"row chat-msg" + type + "\">";
    str += "<div class=\"cm-msg-text2\">";
    str += msg;
    str += "<\/div><\/div>";

    // Tampilkan pesan dengan animasi 
    $(".chat-logs1").append(str);
    $("#cm-msg2-" + INDEX2).hide().fadeIn(300);

    // Scroll ke pesan terakhir
    $(".chat-logs1").stop().animate({ scrollTop: $(".chat-logs1")[0].scrollHeight }, 1000);
}

function recordingAnimation() {
  INDEX1++;
    var str = "";
    var type = 'self';
    str += "<div id='cm-msg1-" + INDEX1 + "' class=\"row chat-msg" + type + " recording-animate\">";
    str += "<div class=\"cm-msg-text1 col-md\" style=\"background:red; color:white;\">";
    str += "<span class=\"spinner-grow spinner-grow-sm\" role=\"status\" aria-hidden=\"true\"></span>";
    str += "Recording...";
    str += "<\/div><\/div>";

    // Tampilkan pesan dengan animasi 
    $(".chat-logs1").append(str);
    $("#cm-msg1-" + INDEX1).hide().fadeIn(300);

    // Scroll ke pesan terakhir
    $(".chat-logs1").stop().animate(
        {
            scrollTop: $(".chat-logs1")[0].scrollHeight
        }, 1000);
}

function generate_menu(msg, list_menu, type) {
  INDEX2++;
  var str = "";
  str += "<div id='cm-msg2-" + INDEX2 + "' class=\"row chat-msg" + type + "\">";
  str += "<div class=\"cm-msg-text2\">";
  str += msg;
  str += "<ul>";
  str += "<table>";
  list_menu.forEach(item => {    
      harga = getHargaMakanan(item);
      str += "<tr>";
      str += "<td>";
      str += "<li>";
      str += item
      str += "</li>";
      str += "</td>";
      str += "<td>";
      str += " : " + formatRupiah(harga);
      str += "</td>";
      str += "</tr>";
  });
  str += "</table>";
  str += "</ul>";
  str += "<p>Silakan pilih menu yang Anda inginkan.</p>"
  str += "<\/div><\/div>";

  // Tampilkan pesan dengan animasi 
  $(".chat-logs1").append(str);
  $("#cm-msg2-" + INDEX2).hide().fadeIn(300);

  // Scroll ke pesan terakhir
  $(".chat-logs1").stop().animate({ scrollTop: $(".chat-logs1")[0].scrollHeight }, 1000);
}

function getHargaMakanan(namaMakanan) {
  var menu = {
    'Nasi Goreng': 15000,
    'Indomie Goreng': 10000,
    'Nasi Ayam': 20000,
    'Ayam Goreng': 23000,
    'Ayam Bakar': 25000,
    'Ayam Rica-Rica': 25000,
    'Ayam Kecap': 25000,
    'Ayam Sambal': 25000,
    'Ayam Rendang': 25000,
    'Ayam Gulai': 25000,
    'Cumi Saus Tiram': 28000,
    'Cumi Sambal': 28000,
    'Cumi Bakar': 30000,
    'Sup Iga': 45000,
    'Iga Bakar': 60000,
    'Daging Rendang': 32000,
    'Daging Balado': 32000,
    'Daging Gulai': 32000,
    'Chicken Katsu': 55000,
    'Chicken Steak': 60000,
    'Wagyu Steak': 105000,
    'Popcorn Chicken': 45000,
    'Salmon Teriyaki': 90000,
    'Baked Salmon': 90000,
    'Crispy Calamari': 50000,
    'Burger': 40000,
    'Pizza': 85000,
    'La Pasta': 55000,
    'Spagheti': 55000,
    'Salad': 50000,
    'Chocolate Cake': 35000,
    'Green Tea Cake': 35000,
    'Tiramisu Cake': 35000,
    'Coffee Cake': 35000,
    'Vanilla Cake': 35000,
    'Cheese Cake': 35000,
    'Red Velvet Cake': 35000,
    'Berry Cake': 35000,
    'Cupcake': 30000,
    'Pancake': 30000,
    'Brownies': 30000,
    'Crepes': 30000,
    'Croffle': 35000,
    'Glazed Donuts': 35000,
    'Roti Bakar': 20000,
    'Mochi': 30000,
    'Ice Cream': 25000,
    'Gelato': 25000,
    'Pudding': 20000,
    'Jus Alpukat': 20000,
    'Jus Anggur': 20000,
    'Jus Apel': 20000,
    'Jus Apricot': 25000,
    'Jus Belimbing': 20000,
    'Jus Buah Naga': 20000,
    'Jus Bluberi': 25000,
    'Jus Jambu': 20000,
    'Jus Jeruk': 20000,
    'Jus Kiwi': 20000,
    'Jus Leci': 25000,
    'Jus Mangga': 20000,
    'Jus Manggis': 20000,
    'Jus Melon': 20000,
    'Jus Nanas': 20000,
    'Jus Pisang': 20000,
    'Jus Peach': 25000,
    'Jus Pepaya': 20000,
    'Jus Semangka': 20000,
    'Jus Sirsak': 20000,
    'Jus Stroberi': 25000,
    'Air Mineral': 10000,
    'Milkshake': 20000,
    'Fruit Tea': 15000,
    'Latte': 27000,
    'Cappuccino': 27000,
    'Macchiato': 27000,
    'Ice Blend': 25000,
    'Iced Tea': 20000,
    'Ice Chocolate': 20000,
    'Hot Chocolate': 20000,
    'Hot Tea': 20000,
    'Green Tea Float': 22000,
    'Berry Float': 22000,
    'Mocha Float': 22000
};
return menu[namaMakanan];
}

const formatRupiah = (money) => {
  return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
  ).format(money);
}