<?php

$_POST = json_decode(file_get_contents('php://input'), true);
$category = array('Skala H0', 'Skala TT', 'Skala N', 'Literatura');
$manufacturer = array('PIKO', 'ROCO', 'TRIX', 'LIMA', 'ARNOLD');

$category1true = array(
      'id' => 1,
      'metaTitle' => 'Skala H0',
      'checked' => true,
);
$category2true = array(
      'id' => 2,
      'metaTitle' => 'Skala TT',
      'checked' => true,
);
$category3true = array(
      'id' => 3,
      'metaTitle' => 'Skala N',
      'checked' => true,
);
$category4true = array(
      'id' => 3,
      'metaTitle' => 'Literatura',
      'checked' => true,
);
$category1false = array(
      'id' => 1,
      'metaTitle' => 'Skala H0',
      'checked' => false,
);
$category2false = array(
      'id' => 2,
      'metaTitle' => 'Skala TT',
      'checked' => false,
);
$category3false = array(
      'id' => 3,
      'metaTitle' => 'Skala N',
      'checked' => false,
);
$category4false = array(
      'id' => 3,
      'metaTitle' => 'Literatura',
      'checked' => false,
);
$tag1 = array(
      "id" => 1,
      "name" => "wagon"
);
$tag2 = array(
      "id" => 2,
      "name" => "towarowy"
);
$tag3 = array(
      "id" => 3,
      "name" => "1:87"
);
$tag4 = array(
      "id" => 4,
      "name" => "piko"
);
$tag5 = array(
      "id" => 5,
      "name" => "osobowy"
);
$tag6 = array(
      "id" => 6,
      "name" => "cysterna"
);
$tag7 = array(
      "id" => 7,
      "name" => "chłodnia"
);
$tag8 = array(
      "id" => 8,
      "name" => "węglarka"
);
$tag9 = array(
      "id" => 8,
      "name" => "kryty"
);
$obj1 = array(
      'id' => 1,
      'age' => 34,
      'surname' => 'Albert',
      'name' => 'Ducin',
      'occupation' => 'coder'
);
$obj2 = array(
      'id' => 2,
      'age' => 39,
      'surname' => 'Someone',
      'name' => 'Else',
      'occupation' => 'driver'
);
$obj3 = array(
      'id' => 3,
      'age' => 20,
      'surname' => 'Young',
      'name' => 'New',
      'occupation' => 'student'
);
$list = array($obj1, $obj2, $obj3);
$reductionNew = array("reduction" => 0.1500, "reductionType" => "percentage");
$reductionOld = array("reduction" => 2.0000, "reductionType" => "amount");
$discount = array('new' => $reductionNew, 'old' => $reductionOld);
$discountNew = array();
$discountNew[0] = array('new' => false);
$discountNew[1] = array('old' => false);
$id461 = array(
      "productId" => 461,
      "attributeId" => 0,
      "productName" => "Kryty z wysokim dachem DB PIKO",
      "productQuantity" => 1,
      "reduction" => "---",
      "totalPrice" => "32.00",
      "unitPrice" => "32.00",
      "counter" => 1,
      "totalPriceDiscount" => "27.20",
      "unitPriceDiscount" => "27.20",
      "linkRewrite" => "kryty-z-wysokim-dachem-db-piko",
      "quantity" => array(
            "current" => 0, 
            "toUpdate" => 0,
      ),
      "cover" => "http:\/\/modele-ad9bis.pl\/img\/p\/461-17940-thickbox.jpg",
);
$id643 = array(
      "productId" => 643,
      "attributeId" => 0,
      "productName" => "4-osiowy osobowy 1\/2 kl. DB N",
      "productQuantity" => 1,
      "reduction" => "---",
      "totalPrice" => "75.00",
      "unitPrice" => "75.00",
      "counter" => 2,
      "totalPriceDiscount" => "63.75",
      "unitPriceDiscount" => "63.75",
      "linkRewrite" => "4-osiowy-osobowy-hecht-1-kl-db-n",
      "quantity" => array(
            "current" => 0, 
            "toUpdate" => 0,
      ),
      "cover" => "http:\/\/modele-ad9bis.pl\/img\/p\/643-20428-thickbox.jpg",
);
$id644 = array(
      "productId" => 644,
      "attributeId" => 0,
      "productName" => "4-osiowy osobowy Hecht DB N",
      "productQuantity" => 1,
      "reduction" => "---",
      "totalPrice" => "75.00",
      "unitPrice" => "75.00",
      "counter" => 2,
      "totalPriceDiscount" => "63.75",
      "unitPriceDiscount" => "63.75",
      "linkRewrite" => "4-osiowy-boczniak-3-klasy-arnold-n",
      "quantity" => array(
            "current" => 1, 
            "toUpdate" => 1,
      ),
      "cover" => "http:\/\/modele-ad9bis.pl\/img\/p\/644-22905-thickbox.jpg",
);
$id972 = array(
      "productId" => 972,
      "attributeId" => 0,
      "productName" => "Czarne ko\u0142o 11 mm z bia\u0142\u0105 z\u0119batk\u0105 PIKO",
      "productQuantity" => 2,
      "reduction" => "---",
      "totalPrice" => "6.00",
      "unitPrice" => "6.00",
      "counter" => 1,
      "totalPriceDiscount" => "5.10",
      "unitPriceDiscount" => "5.10",
      "linkRewrite" => "czarne-kolo-11-mm-z-zebatka-piko",
      "quantity" => array(
            "current" => 0, 
            "toUpdate" => 0,
      ),
      "cover" => "http:\/\/modele-ad9bis.pl\/img\/p\/972-7654-thickbox.jpg",
);
$id1040 = array(
      "productId" => 1040,
      "attributeId" => 0,
      "productName" => "2-osiowy wagon pasa\u017cerski PKP",
      "productQuantity" => 1,
      "reduction" => "---",
      "totalPrice" => "70.00",
      "unitPrice" => "70.00",
      "counter" => 1,
      "totalPriceDiscount" => "59.50",
      "unitPriceDiscount" => "59.50",
      "linkRewrite" => "wagon-2-klasy-db-roco-h0",
      "quantity" => array(
            "current" => 0, 
            "toUpdate" => 0,
      ),
      "cover" => "http:\/\/modele-ad9bis.pl\/img\/p\/1040-22229-thickbox.jpg",
);
$id506 = array(
      "productId" => 506,
      "attributeId" => 0,
      "productName" => "\u0141uk wyr\u00f3wnawczy 2\/3 R 380 dawnego PIKO- nieu\u017cywany",
      "productQuantity" => 6,
      "reduction" => "---",
      "totalPrice" => "1.30",
      "unitPrice" => "1.30",
      "counter" => 4,
      "totalPriceDiscount" => "1.11",
      "unitPriceDiscount" => "1.11",
      "linkRewrite" => "standartowy-tor-wyrownawczy-piko",
      "quantity" => array(
            "current" => 0, 
            "toUpdate" => 0,
      ),
      "cover" => "http:\/\/modele-ad9bis.pl\/img\/p\/506-6073-thickbox.jpg",
);
$id507 = array(
      "productId" => 507,
      "attributeId" => 0,
      "productName" => "\u0141uk wyr\u00f3wnawczy 2\/3 R 440 dawnego PIKO",
      "productQuantity" => 6,
      "reduction" => "---",
      "totalPrice" => "1.20",
      "unitPrice" => "1.20",
      "counter" => 3,
      "totalPriceDiscount" => "1.02",
      "unitPriceDiscount" => "1.02",
      "linkRewrite" => "standartowy-tor-lukowy-2-3-piko",
      "quantity" => array(
            "current" => 30, 
            "toUpdate" => 30,
      ),
      "cover" => "http:\/\/modele-ad9bis.pl\/img\/p\/507-6077-thickbox.jpg",
);
$id760 = array(
      "productId" => 760,
      "attributeId" => 0,
      "productName" => "Tor prosty 1\/3 67mm PIKO",
      "productQuantity" => 6,
      "reduction" => "---",
      "totalPrice" => "1.20",
      "unitPrice" => "1.20",
      "counter" => 1,
      "totalPriceDiscount" => "1.02",
      "unitPriceDiscount" => "1.02",
      "linkRewrite" => "tor-prosty-1-3-67mm-piko",
      "quantity" => array(
            "current" => 38, 
            "toUpdate" => 38,
      ),
      "cover" => "http:\/\/modele-ad9bis.pl\/img\/p\/760-23182-thickbox.jpg",
);
$id1014 = array(
      "productId" => 1014,
      "attributeId" => 0,
      "productName" => "Tor prosty 107 mm - PIKO",
      "productQuantity" => 1,
      "reduction" => "---",
      "totalPrice" => "1.50",
      "unitPrice" => "1.50",
      "counter" => 2,
      "totalPriceDiscount" => "1.28",
      "unitPriceDiscount" => "1.28",
      "linkRewrite" => "tor-prosty-107-mm-piko",
      "quantity" => array(
            "current" => 1, 
            "toUpdate" => 1,
      ),
      "cover" => "http:\/\/modele-ad9bis.pl\/img\/p\/1014-3148-thickbox.jpg",
);
$id1199 = array(
      "productId" => 1199,
      "attributeId" => 0,
      "productName" => "Sprz\u0119g ko\u0144cowej produkcji BTTB",
      "productQuantity" => 8,
      "reduction" => "---",
      "totalPrice" => "39.92",
      "unitPrice" => "4.99",
      "counter" => 1,
      "totalPriceDiscount" => "33.93",
      "unitPriceDiscount" => "4.24",
      "linkRewrite" => "sprzeg-koncowej-produkcji-bttb",
      "quantity" => array(
            "current" => 0, 
            "toUpdate" => 0,
      ),
      "cover" => "http:\/\/modele-ad9bis.pl\/img\/p\/1199-18552-thickbox.jpg",
);
$attribute = array(
      'new' => 0,
      'old' => 0,
);
$discount = array(
      'new' => false,
      'old' => false,
);
$price50 = array(
      'new' => "38.00",
      'old' => "38.00",
);
$quantity50 = array(
      'new' => 1,
      'old' => 1,
);
$price51 = array(
      'new' => "35.00",
      'old' => "35.00",
);
$quantity51 = array(
      'new' => 2,
      'old' => 1,
);
$price52 = array(
      'new' => "39.00",
      'old' => "38.90",
);
$quantity52 = array(
      'new' => 0,
      'old' => 0,
);
$price53 = array(
      'new' => "29.90",
      'old' => "29.90",
);
$quantity53 = array(
      'new' => 2,
      'old' => 2,
);
$price54 = array(
      'new' => "29.90",
      'old' => "30.90",
);
$quantity54 = array(
      'new' => 2,
      'old' => 3,
);
$basicProduct50 = array(
      'id' => 50,
      'attribute' => $attribute,
      'price' => $price50,
      'discount' => $discount,
      'quantity' => $quantity50,
      'image' => 19713,
      'name' => "W\u0119glarka metalowa typ Es MAV- III ep.- PIKO",
      'linkRewrite' => "weglarka-metalowa-typ-es-mav-piko",
      'success' => true,
);
$basicProduct51 = array(
      'id' => 51,
      'attribute' => $attribute,
      'price' => $price51,
      'discount' => $discount,
      'quantity' => $quantity51,
      'image' => 3706,
      'name' => "Cysterna Schwedt DR z brekiem- PIKO",
      'linkRewrite' => "cysterna-schwedt-dr-z-brekiem-piko",
      'success' => true,
);
$basicProduct52 = array(
      'id' => 52,
      'attribute' => $attribute,
      'price' => $price52,
      'discount' => $discount,
      'quantity' => $quantity52,
      'image' => 19405,
      'name' => "Boczniak z brekiem DR PIKO",
      'linkRewrite' => "boczniak-z-brekiem-dr-piko",
      'success' => true,
);
$basicProduct53 = array(
      'id' => 53,
      'attribute' => $attribute,
      'price' => $price53,
      'discount' => $discount,
      'quantity' => $quantity53,
      'image' => 15367,
      'name' => "Czarny kryty SNCF z niskim dachem - PIKO",
      'linkRewrite' => "czarny-kryty-sncf-z-niskim-dachem-piko",
      'success' => true,
);
$basicProduct54 = array(
      'id' => 54,
      'attribute' => $attribute,
      'price' => $price54,
      'discount' => $discount,
      'quantity' => $quantity54,
      'image' => 8612,
      'name' => "Ch\u0142odnia -Kuhlwagen- z wysokim dachem DR PIKO",
      'linkRewrite' => "chlodnia-kuhlwagen-z-wysokim-dachem-dr-piko",
      'success' => true,
);
$basicProduct = array(
      '50' => $basicProduct50,
      '51' => $basicProduct51,
      '52' => $basicProduct52,
      '53' => $basicProduct53,
      '54' => $basicProduct54,
);

$order1Array = array($id972);
$order2Array = array($id461);
$order3Array = array($id644, $id643);
$order4Array = array($id1040);
$order5Array = array($id760, $id1014, $id506, $id507);
$order6Array = array($id1199);
$order1 = array(
      'customer' => array(
            'id' => 73,
            'firstname' => 'Marcin',
            'lastname' => 'Bomba',
            'email' => "marcin.bomba@gmail.com",
      ),
      'reference' => "000000100",
      "totalPaid" => "23.00",
      "totalProduct" => "12.00",
      "totalShipment" => "11.00",
      "payment" => "pobranie",
      "cartDetails" => $order1Array,
);
$order2 = array(
      'customer' => array(
            'id' => 60,
            'firstname' => 'Micha\u0142',
            'lastname' => 'WDOWISZEWSKI',
            'email' => "estimabis@op.pl",
      ),
      'reference' => "000000101",
      "totalPaid" => "41.00",
      "totalProduct" => "32.00",
      "totalShipment" => "9.00",
      "payment" => "przelew bankowy",
      "cartDetails" => $order2Array,
);
$order3 = array(
      'customer' => array(
            'id' => 83,
            'firstname' => 'Przemys\u0142aw',
            'lastname' => 'ZGLICZY\u0143SKI',
            'email' => "pezet1001@op.pl",
      ),
      'reference' => "000000102",
      "totalPaid" => "164.00",
      "totalProduct" => "150.00",
      "totalShipment" => "14.00",
      "payment" => "przelew bankowy",
      "cartDetails" => $order3Array,
);
$order4 = array(
      'customer' => array(
            'id' => 84,
            'firstname' => '\u0142ukasz',
            'lastname' => 'KANIA',
            'email' => "l.kania@vp.pl",
      ),
      'reference' => "000000103",
      "totalPaid" => "70.00",
      "totalProduct" => "70.00",
      "totalShipment" => "0.00",
      "payment" => "przelew bankowy",
      "cartDetails" => $order4Array,
);
$order5 = array(
      'customer' => array(
            'id' => 85,
            'firstname' => 'Jaros\u0142aw',
            'lastname' => 'KU\u015aMIERCZYK',
            'email' => "kapt@kapt.com.pl",
      ),
      'reference' => "000000104",
      "totalPaid" => "31.70",
      "totalProduct" => "23.70",
      "totalShipment" => "8.00",
      "payment" => "przelew bankowy",
      "cartDetails" => $order5Array,
);
$order6 = array(
      'customer' => array(
            'id' => 2081,
            'firstname' => 'Bartosz',
            'lastname' => 'Kr\u00f3lak',
            'email' => "bartosz_krolak@wp.pl",
      ),
      'reference' => "SPKDZFTDG",
      "totalPaid" => "47.42",
      "totalProduct" => "39.92",
      "totalShipment" => "7.50",
      "payment" => "przelew bankowy",
      "cartDetails" => $order6Array,
);
$orderOld = array($order1, $order2, $order3, $order4, $order5);
$orderNew = array($order6);
$product1 = array(
      'id' => 50,
      'active' => 1,
      'amount' => 3,
      'category' => array($category1true, $category2false, $category3false, $category4true),
      'condition' => 'new',
      'description' => 'Szczegółowy opis produktu numer 1.',
      'descriptionShort' => 'Skrócony opis produktu numer 1.',
      'discount' => $discount,
      'image' => 19713,
      'images' => array(
            "http:\/\/modele-ad9bis.pl\/img\/p\/50-19714-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/50-19715-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/50-19713-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/50-19716-thickbox.jpg",
      ),
      'name' => 'Węglarka metalowa typ Es MAV- III ep.- PIKO',
      'manufacturer' => 1,
      'metaDescription' => 'Modele-ad9bis - H0, kategoria: wagony H0. Sklep internetowy modelarstwa kolejowego: H0, TT, N',
      'metaTitle' => 'Węglarka metalowa typ Es MAV- III ep.- PIKO',
      'price' => array(
            'new' => 29.90,
            'old' => 29.90,
      ),
      'priceReal' => array(
            'new' => 26.90,
            'old' => 27.00,
      ),
      'productCategories' => array(1, 4),
      'productTags' => array($tag1, $tag2, $tag3, $tag4, $tag8),
      'url' => 'weglarka-metalowa-typ-es-mav-piko',
);
$product2 = array(
      'id' => 51,
      'active' => 1,
      'amount' => 2,
      'category' => array($category1false, $category2true, $category3true, $category4false),
      'condition' => 'used',
      'description' => 'Szczegółowy opis produktu numer 2.',
      'descriptionShort' => 'Skrócony opis produktu numer 2.',
      'discount' => $discountNew,
      'image' => 3706,
      'images' => array(
            "http:\/\/modele-ad9bis.pl\/img\/p\/51-12549-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/51-12550-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/51-12551-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/51-12552-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/51-12553-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/51-3706-thickbox.jpg",
      ),
      'manufacturer' => 3,
      'metaDescription' => 'Modele-ad9bis - H0, kategoria: cysterny H0. Sklep internetowy modelarstwa kolejowego: H0, TT, N',
      'metaTitle' => 'Cysterna Schwedt DR z brekiem- PIKO',
      'name' => 'Cysterna Schwedt DR z brekiem- PIKO',
      'price' => array(
            'new' => 34.90,
            'old' => 33.90,
      ),
      'productCategories' => array(2, 3),
      'productTags' => array($tag1, $tag2, $tag3, $tag4, $tag6),
      'url' => 'cysterna-schwedt-dr-z-brekiem-piko',
);
$discountNew[1] = array('old' => false);
$product3 = array(
      'id' => 52,
      'active' => 1,
      'amount' => 1,
      'category' => array($category1true, $category2true, $category3false, $category4false),
      'condition' => 'new',
      'description' => 'Szczegółowy opis produktu numer 3.',
      'descriptionShort' => 'Skrócony opis produktu numer 3.',
      'discount' => $discountNew,
      'image' => 19405,
      'images' => array(
            "http:\/\/modele-ad9bis.pl\/img\/p\/52-19407-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/52-19408-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/52-19406-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/52-19418-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/52-19405-thickbox.jpg",
      ),
      'manufacturer' => 2,
      'metaDescription' => 'Modele-ad9bis - H0, kategoria: wagony osobowe H0. Sklep internetowy modelarstwa kolejowego: H0, TT, N',
      'metaTitle' => 'Boczniak z brekiem DR PIKO',
      'name' => 'Boczniak z brekiem DR PIKO',
      'price' => array(
            'new' => 35,
            'old' => 35,
      ),
      'productCategories' => array(1, 2),
      'productTags' => array($tag1, $tag3, $tag4, $tag5),
      'url' => 'boczniak-z-brekiem-dr-piko',
);
$product4 = array(
      'id' => 53,
      'active' => 0,
      'amount' => 0,
      'category' => array($category1false, $category2false, $category3true, $category4true),
      'condition' => 'renewed',
      'description' => 'Szczegółowy opis produktu numer 4.',
      'descriptionShort' => 'Skrócony opis produktu numer 4.',
      'discount' => $discountNew,
      'image' => 15367,
      'images' => array(
            "http:\/\/modele-ad9bis.pl\/img\/p\/53-15368-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/53-15370-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/53-15369-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/53-15367-thickbox.jpg",
      ),
      'manufacturer' => 1,
      'metaDescription' => 'Modele-ad9bis - H0, kategoria: kryte h0. Sklep internetowy modelarstwa kolejowego: H0, TT, N',
      'metaTitle' => 'Czarny kryty SNCF z niskim dachem - PIKO',
      'name' => 'Czarny kryty SNCF z niskim dachem - PIKO',
      'price' => array(
            'new' => 31.90,
            'old' => 31.90,
      ),
      'productCategories' => array(3, 4),
      'productTags' => array($tag1, $tag2, $tag3, $tag4, $tag9),
      'url' => 'czarny-kryty-sncf-z-niskim-dachem-piko',
);
$product5 = array(
      'id' => 54,
      'active' => 0,
      'amount' => 10,
      'category' => array($category1true, $category2true, $category3true, $category4false),
      'condition' => 'used',
      'description' => 'Szczegółowy opis produktu numer 5.',
      'descriptionShort' => 'Skrócony opis produktu numer 5.',
      'discount' => $discountNew,
      'image' => 8612,
      'images' => array(
            "http:\/\/modele-ad9bis.pl\/img\/p\/54-8615-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/54-8614-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/54-8613-thickbox.jpg",
            "http:\/\/modele-ad9bis.pl\/img\/p\/54-8612-thickbox.jpg",
      ),
      'manufacturer' => 4,
      'metaDescription' => 'Modele-ad9bis - H0, kategoria: chłodnie h0. Sklep internetowy modelarstwa kolejowego: H0, TT, N',
      'metaTitle' => 'Chłodnia -Kuhlwagen- z wysokim dachem DR PIKO',
      'name' => 'Chłodnia -Kuhlwagen- z wysokim dachem DR PIKO',
      'price' => array(
            'new' => 3.99,
            'old' => 3.99,
      ),
      'productCategories' => array(1, 2, 3),
      'productTags' => array($tag1, $tag2, $tag3, $tag4, $tag7),
      'url' => 'chlodnia-kuhlwagen-z-wysokim-dachem-dr-piko',
);
$history1 = array(
      'id' => 50,
      'date' => '01-03-2017',
      'shop' => 'new',
      'amount' => 1,
      'user' => 'Sławinek'
      );
$history2 = array(
      'id' => 51,
      'date' => '03-03-2017',
      'shop' => 'new',
      'amount' => 2,
      'user' => 'Sławinek'
      );
$history3 = array(
      'id' => 52,
      'date' => '05-03-2017',
      'shop' => 'old',
      'amount' => 0,
      'user' => 'Wrocław'
      );
$history4 = array(
      'id' => 53,
      'date' => '07-03-2017',
      'shop' => 'new',
      'amount' => 2,
      'user' => 'Wrocław'
      );
$history5 = array(
      'id' => 53,
      'date' => '07-03-2017',
      'shop' => 'old',
      'amount' => 2,
      'user' => 'Wrocław'
      );
$history6 = array(
      'id' => 50,
      'date' => '09-03-2017',
      'shop' => 'old',
      'amount' => 2,
      'user' => 'Sławinek'
      );
$history7 = array(
      'id' => 51,
      'date' => '15-03-2017',
      'shop' => 'new',
      'amount' => 3,
      'user' => 'Sławinek'
      );
$history8 = array(
      'id' => 52,
      'date' => '17-03-2017',
      'shop' => 'old',
      'amount' => 0,
      'user' => 'Wrocław'
      );
$history9 = array(
      'id' => 52,
      'date' => '21-03-2017',
      'shop' => 'old',
      'amount' => 2,
      'user' => 'Wrocław'
      );
$history = array($history1, $history2, $history3, $history4, $history5, $history6, $history7, $history8, $history9);
$productList = array($product1, $product2, $product3, $product4, $product5);
if (isset($_POST['token'])) {
      if ($_POST['token'] === 'bfae967100f7a239ff4f651dd5257cd8') {
            $result = array(
                  'success' => true,
                  'reason' => 'Użytkownik aktualnie zalogowany',
                  'token' => 'bfae967100f7a239ff4f651dd5257cd8',
            );
      } else {
           $result = array(
                  'success' => false,
                  'reason' => 'Niepoprawny token użytkownika!',
            );
      }
} elseif (isset($_GET['basicProduct'])) {
      foreach ($basicProduct as $single) {
            if ($single['id'] == $_GET['basicProduct']) {
                  $result = $single;
            }
      }
} elseif (isset($_POST['data'])) {
      $action = $_POST['data']['action'];
      if ($action === 'login') {
            $email = $_POST['data']['login'];
            $password = $_POST['data']['password'];
            if ($email === 'aducin' && $password === 'NrEQ757542') {
                  $result = array(
                        'success' => true,
                        'reason' => 'Hasło poprawne. Trwa przekierowywanie...',
                        'token' => 'bfae967100f7a239ff4f651dd5257cd8',
                  );
            } else {
                  $result = array(
                        'success' => false,
                        'reason' => 'Niepoprawne hasło lub użytkownik!',
                  );
            }
            echo json_encode($result);
            exit();
      } elseif ($action === 'tokenCheck') {
            if ($_POST['data']['token'] === 'bfae967100f7a239ff4f651dd5257cd8') {
                  $result = array(
                        'success' => true,
                        'reason' => 'Użytkownik aktualnie zalogowany',
                        'token' => 'bfae967100f7a239ff4f651dd5257cd8',
                  );
            } else {
                 $result = array(
                        'success' => false,
                        'reason' => 'Niepoprawny token użytkownika!',
                  );
            }
            echo json_encode($result);
            exit();
      } elseif ($action === 'add' || $action === 'subtract') {
            if ($action === 'add') {
                  $finalAmount = floatVal(188.13 + $_POST['data']['amount']);
            } else {
                  $finalAmount = floatVal(188.13 - $_POST['data']['amount']);
            }
            $result = array(
                  'success' => true,
                  'reason' => 'Zmiany poprawnie zapisane!',
                  'amount' => $finalAmount,
            );
      } elseif ($action === 'discountMail' || $action === 'voucherMail' || $action === 'shipment' || $action === 'remindNew' || $action === 'remindOld') {
             $result = array(
                  'success' => true,
                  'reason' => 'Email został skutecznie wysłany!',
            );
      } else {
            $id = $_POST['data']['id'];
            $origin = $_POST['data']['origin'];
            if ($origin === 'product') {
                  $result = array(
                        'success' => true,
                        'reason' => 'Zmiany poprawnie zapisane!',
                        'active' => $_POST['data']['active'],
                        'amount' => $_POST['data']['amount'],
                        'condition' => $_POST['data']['condition'],
                        'description' => $_POST['data']['description'],
                        'descriptionShort' => $_POST['data']['descriptionShort'],
                        'id' => $id,
                        'metaDescription' => $_POST['data']['metaDescription'],
                        'metaTitle' => $_POST['data']['metaTitle'],
                        'name' => $_POST['data']['name'],
                        'price' => $_POST['data']['price'],
                  );
            }
      }
} elseif (isset($_GET['action']) && $_GET['action'] === 'history') {
      $result = array(
            'list' => array()
      );
      foreach($history as $single) {
            if ($single['id'] == intVal($_GET['id'])) {
                  $result['list'][] = $single;
                  $result['success'] = true;
            }
      }
      $result['id'] = intVal($_GET['id']);
      if (empty($result['list'])) {
            $result['success'] = true;
            $result['empty'] = true;
      }
} elseif (isset($_GET['user'])) {
      foreach($list as $single) {
	    if($single['id'] == $_GET['user']) {
		  $single['success'] = true;
		  echo json_encode($single);
		  exit();
	    }
      }
} elseif (isset($_GET['length'])) {
      $result = array(
	  'success' => true,
	  'length' => count($list)
      );
} elseif (isset($_GET['category']) && !isset($_GET['nameSearch'])) {
      $list = array();
      $counter = 1;
      foreach ($category as $single) {
	  $list[] = array(
	      'id' => $counter,
	      'name' => $single
	  );
	  $counter++;
      }
      $result = array(
	  'success' => true,
	  'list' => $list
      );
} elseif (isset($_GET['manufacturer']) && !isset($_GET['nameSearch'])) {
      $list = array();
      $counter = 1;
      foreach ($manufacturer as $single) {
	  $list[] = array(
	      'id' => $counter,
	      'name' => $single
	  );
	  $counter++;
      }
      $result = array(
	  'success' => true,
	  'list' => $list
      );
} elseif (isset($_GET['postal'])) {
      $list1 = array(
            "number" => 1,
            "current" => "188.13",
            "date" => "2017-05-15 18:02:08",
      );
      $list2 = array(
            "number" => 2,
            "current" => "235.13",
            "date" => "2017-05-14 20:56:52",
      );
      $list3 = array(
            "number" => 3,
            "current" => "23.13",
            "date" => "2017-05-13 12:32:01",
      );
      $list4 = array(
            "number" => 4,
            "current" => "61.43",
            "date" => "2017-05-11 12:36:07",
      );
      $list5 = array(
            "number" => 5,
            "current" => "77.43",
            "date" => "2017-05-09 15:22:58",
      );
      $list = array($list1, $list2, $list3, $list4, $list5);
      $result = array(
            'success' => true,
            'current' => "188.13",
            'list' => $list,
      );
} elseif (isset($_GET['product'])) {
      $result = array();
      foreach($productList as $single) {
	      if($single['id'] == $_GET['product']) {
		      $result = $single;
		      $result['success'] = true;
		      $result['empty'] = false;
                  if ($_GET['edition'] === 'full') {
                        $result['edition'] = 'full';
                  } elseif ($_GET['edition'] === 'simple') {
                        $result['edition'] = 'simple';
                  }  
	      }
      }
      if (empty($result)) {
	      $result = array('success' => true, 'empty' => true, 'reason' => 'Stary panel - nie znaleziono wyników dla ID: '. $_GET['product'] . '!');
      }
} elseif (isset($_GET['nameSearch'])) {
      $result = array();
      $result['list'] = array();
      foreach($productList as $single) {
            $matchName = false;
            $matchCategory = false;
            $matchManufacturer = false;
            if (strpos(strtolower($single['name']), strtolower($_GET['name'])) !== false) {
                  $matchName = true;
            }
            if ($_GET['category'] == 0 || in_array($_GET['category'], $single['category'])) {
                  $matchCategory = true;
            }
            if ($_GET['manufacturer'] == $single['manufacturer'] || $_GET['manufacturer'] == 0) {
                  $matchManufacturer = true;
            }
            if ($matchName && $matchCategory && $matchManufacturer) {
                  $result['list'][] = array(
                        'id' => $single['id'],
                        'image' => $single['image'],
                        'link_rewrite' => $single['url'],
                        'name' => $single['name'],
                  ); 
            }
      }
      if (!empty($result['list'])) {
            $result['success'] = true; 
      } else {
            $result = array('success' => true, 'empty' => true, 'reason' => 'Stary panel - nie znaleziono wyników dla nazwy: '. $_GET['name'] . '!');
      }
} elseif (isset($_GET['action']) && $_GET['action'] === 'order') {
      if (isset($_GET['basic']) && isset($_GET['id'])) {
            $error = false;
            if ($_GET['id'] == 100) {
                  $response = array('id' => 73);
            } elseif ($_GET['id'] == 101) {
                  $response = array('id' => 60);
            } elseif ($_GET['id'] == 102) {
                  $response = array('id' => 83);
            } elseif ($_GET['id'] == 103) {
                  $response = array('id' => 84);
            } elseif ($_GET['id'] == 104) {
                  $response = array('id' => 85);
            } else {
                  $error = true;
            }
            if (!($error)) {
                  $result = array(
                        'customer' => $response,
                  );
            } else {
                  $result = array(
                        'success' => false,
                        'reason' => 'Nie znaleziono zamówienia o podanym numerze ID!',
                  );
            }
      } elseif (isset($_GET['db']) && isset($_GET['id']) && isset($_GET['even'])) {
            if ($_GET['id'] == 100) {
                  $even1 = array(
                        'attributeId' => 0,
                        'baseDbQuantity' => 0,
                        'cover' => "http://modele-ad9bis.pl/img/p/972-7654-thickbox.jpg",
                        'id' => 972,
                        'linkRewrite' => "czarne-kolo-11-mm-z-zebatka-piko",
                        'modification' => "---",
                        'name' => "Czarne koło 11 mm z białą zębatką PIKO",
                        'ordered' => 2,
                        'quantityAfterChange' => 0,
                        'quantityBeforeChange' => 0,
                        'success' => true,
                  );
                  $result = array($even1);
            } elseif ($_GET['id'] == 101) {
                  $even1 = array(
                        'attributeId' => 0,
                        'baseDbQuantity' => 0,
                        'cover' => "http://modele-ad9bis.pl/img/p/461-17940-thickbox.jpg",
                        'id' => 461,
                        'linkRewrite' => "kryty-z-wysokim-dachem-db-piko",
                        'modification' => "---",
                        'name' => "Kryty z wysokim dachem DB PIKO",
                        'ordered' => 1,
                        'quantityAfterChange' => 0,
                        'quantityBeforeChange' => 0,
                        'success' => true,
                  );
                  $result = array($even1);
            } elseif ($_GET['id'] == 102) {
                  $even1 = array(
                        'attributeId' => 0,
                        'baseDbQuantity' => 1,
                        'cover' => "http://modele-ad9bis.pl/img/p/644-22905-thickbox.jpg",
                        'id' => 644,
                        'linkRewrite' => "4-osiowy-boczniak-3-klasy-arnold-n",
                        'modification' => "---",
                        'name' => "4-osiowy osobowy Hecht DB N",
                        'ordered' => 1,
                        'quantityAfterChange' => 1,
                        'quantityBeforeChange' => 1,
                        'success' => true,
                  );
                  $even2 = array(
                        'attributeId' => 0,
                        'baseDbQuantity' => 0,
                        'cover' => "http://modele-ad9bis.pl/img/p/643-20428-thickbox.jpg",
                        'id' => 643,
                        'linkRewrite' => "4-osiowy-osobowy-hecht-1-kl-db-n",
                        'modification' => "---",
                        'name' => "4-osiowy osobowy 1/2 kl. DB N",
                        'ordered' => 1,
                        'quantityAfterChange' => 0,
                        'quantityBeforeChange' => 0,
                        'success' => true,
                  );
                  $result = array($even1, $even2);    
            } elseif ($_GET['id'] == 103) {
                  $even1 = array(
                        'attributeId' => 0,
                        'baseDbQuantity' => 0,
                        'cover' => "http://modele-ad9bis.pl/img/p/1040-22229-thickbox.jpg",
                        'id' => 1040,
                        'linkRewrite' => "wagon-2-klasy-db-roco-h0",
                        'modification' => "---",
                        'name' => "2-osiowy wagon pasażerski PKP",
                        'ordered' => 1,
                        'quantityAfterChange' => 0,
                        'quantityBeforeChange' => 0,
                        'success' => true,
                  );
                  $result = array($even1);   
            } elseif ($_GET['id'] == 104) {
                  $even1 = array(
                        'attributeId' => 0,
                        'baseDbQuantity' => 12,
                        'cover' => "http://modele-ad9bis.pl/img/p/760-23182-thickbox.jpg",
                        'id' => 760,
                        'linkRewrite' => "tor-prosty-1-3-67mm-piko",
                        'modification' => "---",
                        'name' => "Tor prosty 1/3 67mm PIKO",
                        'ordered' => 6,
                        'quantityAfterChange' => 12,
                        'quantityBeforeChange' => 12,
                        'success' => true,
                  );
                  $even2 = array(
                        'attributeId' => 0,
                        'baseDbQuantity' => 1,
                        'cover' => "http://modele-ad9bis.pl/img/p/1014-3148-thickbox.jpg",
                        'id' => 1014,
                        'linkRewrite' => "tor-prosty-107-mm-piko",
                        'modification' => "---",
                        'name' => "Tor prosty 107 mm - PIKO",
                        'ordered' => 1,
                        'quantityAfterChange' => 1,
                        'quantityBeforeChange' => 1,
                        'success' => true,
                  );
                  $even3 = array(
                        'attributeId' => 0,
                        'baseDbQuantity' => 38,
                        'cover' => "http://modele-ad9bis.pl/img/p/507-6077-thickbox.jpg",
                        'id' => 507,
                        'linkRewrite' => "standartowy-tor-lukowy-2-3-piko",
                        'modification' => "---",
                        'name' => "Łuk wyrównawczy 2/3 R 440 dawnego PIKO",
                        'ordered' => 6,
                        'quantityAfterChange' => 38,
                        'quantityBeforeChange' => 38,
                        'success' => true,
                  );
                  $even4 = array(
                        'attributeId' => 0,
                        'baseDbQuantity' => 38,
                        'cover' => "http://modele-ad9bis.pl/img/p/506-6073-thickbox.jpg",
                        'id' => 506,
                        'linkRewrite' => "standartowy-tor-wyrownawczy-piko",
                        'modification' => "---",
                        'name' => "Łuk wyrównawczy 2/3 R 380 dawnego PIKO- nieużywany",
                        'ordered' => 6,
                        'quantityAfterChange' => 38,
                        'quantityBeforeChange' => 38,
                        'success' => true,
                  );
                  $result = array($even1, $even2, $even3, $even4);    
            }
      } elseif (isset($_GET['db']) && isset($_GET['id']) && isset($_GET['action']) && isset($_GET['vouchers'])) {
            if ($_GET['id'] == 73) {
                  $customer = array(
                        'email' => 'marcin.bomba@gmail.com',
                        'firstname' => 'Marcin Bartłomiej',
                        'lastname' => 'BOMBA',
                        'secondShopctivity' => false,
                  );
                  $data1 = array(
                        'dateAdd' => "2011-10-18",
                        'id' => 86,
                        'reference' => "000000086",
                        'totalProduct'  => "273.00",
                        'totalShipping' => "4.00",
                        'voucherNumber' => 1,
                  );
                  $data2 = array(
                        'dateAdd' => "2011-10-21",
                        'id' => 89,
                        'reference' => "000000089",
                        'totalProduct'  => "359.00",
                        'totalShipping' => "4.00",
                        'voucherNumber' => 2,
                  );
                  $data3 = array(
                        'dateAdd' => "2011-10-22",
                        'id' => 90,
                        'reference' => "000000090",
                        'totalProduct'  => "77.80",
                        'totalShipping' => "15.00",
                        'voucherNumber' => 3,
                  );
                  $data = array($data1, $data2, $data3);
                  $result = array(
                        'customer' => $customer,
                        'data' => $data,
                        'lastVoucher' => 3,
                  );
            } elseif ($_GET['id'] == 60) {
                  $customer = array(
                        'email' => 'estimabis@op.pl',
                        'firstname' => 'Michał',
                        'lastname' => 'WDOWISZEWSKI',
                        'secondShopctivity' => false,
                  );
                  $result = array(
                        'customer' => $customer,
                        'lastVoucher' => 0,
                  );
            } elseif ($_GET['id'] == 83) {
                  $customer = array(
                        'email' => 'pezet1001@op.pl',
                        'firstname' => 'Przemysław',
                        'lastname' => 'ZGLICZYŃSKI',
                        'secondShopctivity' => false,
                  );
                  $data1 = array(
                        'dateAdd' => "2011-11-07",
                        'id' => 102,
                        'reference' => "000000102",
                        'totalProduct'  => "150.00",
                        'totalShipping' => "14.00",
                        'voucherNumber' => 1,
                  );
                  $data2 = array(
                        'dateAdd' => "2012-02-02",
                        'id' => 182,
                        'reference' => "000000182",
                        'totalProduct'  => "58.00",
                        'totalShipping' => "11.00",
                        'voucherNumber' => 2,
                  );
                  $data = array($data1, $data2);
                  $result = array(
                        'customer' => $customer,
                        'data' => $data,
                        'lastVoucher' => 2,
                  );
            } elseif ($_GET['id'] == 84) {
                  $customer = array(
                        'email' => 'l.kania@vp.pl',
                        'firstname' => 'łukasz',
                        'lastname' => 'KANIA',
                        'secondShopctivity' => false,
                  );
                  $data1 = array(
                        'dateAdd' => "2011-11-08",
                        'id' => 103,
                        'reference' => "000000103",
                        'totalProduct'  => "70.00",
                        'totalShipping' => "0.00",
                        'voucherNumber' => 1,
                  );
                  $data = array($data1);
                  $result = array(
                        'customer' => $customer,
                        'data' => $data,
                        'lastVoucher' => 1,
                  );
            } elseif ($_GET['id'] == 85) {
                  $customer = array(
                        'email' => 'kapt@kapt.com.pl',
                        'firstname' => 'Jarosław',
                        'lastname' => 'KUŚMIERCZYK',
                        'secondShopctivity' => true,
                  );
                  $result = array(
                        'customer' => $customer,
                        'lastVoucher' => 0,
                  );
            }
      } elseif (isset($_GET['db']) && isset($_GET['id']) && isset($_GET['action']) && isset($_GET['discount'])) {
            $result = array(
                  'success' => false,
                  'reason' => 'Nie znaleziono zamówienia o ID: ' . $_GET['id'],
            );
            if ($_GET['id'] == 100) {
                  $quantity = array(
                        'current' => 0,
                        'toUpdate' => 0,
                  );
                  $detailObj = array(
                        'attributeId' => 0,
                        'counter' => 1,
                        'cover' => "http://modele-ad9bis.pl/img/p/972-7654-thickbox.jpg",
                        'linkRewrite' => "czarne-kolo-11-mm-z-zebatka-piko",
                        'productId' => 972,
                        'productName' => "Czarne koło 11 mm z białą zębatką PIKO",
                        'productQuantity' => 2,
                        'quantity' => $quantity,
                        'reduction' => "---",
                        'totalPrice' => "6.00",
                        'totalPriceDiscount' => "5.10",
                        'unitPrice' => "6.00",
                        'unitPriceDiscount' => "5.10",
                  );
                  $cartDetails = array($detailObj);
                  $customer = array(
                        'email' => 'marcin.bomba@gmail.com',
                        'firstname' => 'Marcin Bartłomiej',
                        'id' => 73,
                        'lastname' => 'BOMBA',
                  );
                  $result = array(
                        'cartDetails' => $cartDetails,
                        'customer' => $customer,
                        'discountExtended' => false,
                        'payment' => "pobranie",
                        'reference' => "000000100",
                        'totalPaid' => "23.00",
                        'totalPaidDiscount' => "19.55",
                        'totalProduct' => "12.00",
                        'totalProductDiscount' => "10.20",
                        'totalShipment' => "11.00",
                  );
            } elseif ($_GET['id'] == 101) {
                  $quantity = array(
                        'current' => 0,
                        'toUpdate' => 0,
                  );
                  $detailObj = array(
                        'attributeId' => 0,
                        'counter' => 1,
                        'cover' => "http://modele-ad9bis.pl/img/p/461-17940-thickbox.jpg",
                        'linkRewrite' => "kryty-z-wysokim-dachem-db-piko",
                        'productId' => 461,
                        'productName' => "Kryty z wysokim dachem DB PIKO",
                        'productQuantity' => 1,
                        'quantity' => $quantity,
                        'reduction' => "---",
                        'totalPrice' => "32.00",
                        'totalPriceDiscount' => "27.20",
                        'unitPrice' => "32.00",
                        'unitPriceDiscount' => "27.20",
                  );
                  $cartDetails = array($detailObj);
                  $customer = array(
                        'email' => 'estimabis@op.pl',
                        'firstname' => 'Michał ',
                        'id' => 60,
                        'lastname' => 'WDOWISZEWSKI',
                  );
                  $result = array(
                        'cartDetails' => $cartDetails,
                        'customer' => $customer,
                        'discountExtended' => false,
                        'payment' => "przelew bankowy",
                        'reference' => "000000101",
                        'totalPaid' => "41.00",
                        'totalPaidDiscount' => "34.85",
                        'totalProduct' => "32.00",
                        'totalProductDiscount' => "27.20",
                        'totalShipment' => "9.00",
                  );
            } elseif ($_GET['id'] == 102) {
                  $quantity1 = array(
                        'current' => 1,
                        'toUpdate' => 1,
                  );
                  $quantity2 = array(
                        'current' => 0,
                        'toUpdate' => 0,
                  );
                  $detailObj1 = array(
                        'attributeId' => 0,
                        'counter' => 1,
                        'cover' => "http://modele-ad9bis.pl/img/p/644-22905-thickbox.jpg",
                        'linkRewrite' => "4-osiowy-boczniak-3-klasy-arnold-n",
                        'productId' => 644,
                        'productName' => "4-osiowy osobowy Hecht DB N",
                        'productQuantity' => 1,
                        'quantity' => $quantity1,
                        'reduction' => "---",
                        'totalPrice' => "75.00",
                        'totalPriceDiscount' => "63.75",
                        'unitPrice' => "75.00",
                        'unitPriceDiscount' => "63.75",
                  );
                  $detailObj2 = array(
                        'attributeId' => 0,
                        'counter' => 2,
                        'cover' => "http://modele-ad9bis.pl/img/p/643-20428-thickbox.jpg",
                        'linkRewrite' => "4-osiowy-osobowy-hecht-1-kl-db-n",
                        'productId' => 643,
                        'productName' => "4-osiowy osobowy 1/2 kl. DB N",
                        'productQuantity' => 1,
                        'quantity' => $quantity2,
                        'reduction' => "---",
                        'totalPrice' => "75.00",
                        'totalPriceDiscount' => "63.75",
                        'unitPrice' => "75.00",
                        'unitPriceDiscount' => "63.75",
                  );
                  $cartDetails = array($detailObj1, $detailObj2);
                  $customer = array(
                        'email' => 'pezet1001@op.pl',
                        'firstname' => 'Przemysław',
                        'id' => 83,
                        'lastname' => 'ZGLICZYŃSKI',
                  );
                  $result = array(
                        'cartDetails' => $cartDetails,
                        'customer' => $customer,
                        'discountExtended' => false,
                        'payment' => "przelew bankowy",
                        'reference' => "000000102",
                        'totalPaid' => "164.00",
                        'totalPaidDiscount' => "139.40",
                        'totalProduct' => "150.00",
                        'totalProductDiscount' => "127.50",
                        'totalShipment' => "14.00",
                  );
            } elseif ($_GET['id'] == 103) {
                  $quantity = array(
                        'current' => 0,
                        'toUpdate' => 0,
                  );
                  $detailObj = array(
                        'attributeId' => 0,
                        'counter' => 1,
                        'cover' => "http://modele-ad9bis.pl/img/p/1040-22229-thickbox.jpg",
                        'linkRewrite' => "wagon-2-klasy-db-roco-h0",
                        'productId' => 1040,
                        'productName' => "2-osiowy wagon pasażerski PKP",
                        'productQuantity' => 1,
                        'quantity' => $quantity,
                        'reduction' => "---",
                        'totalPrice' => "70.00",
                        'totalPriceDiscount' => "59.50",
                        'unitPrice' => "70.00",
                        'unitPriceDiscount' => "59.50",
                  );
                  $cartDetails = array($detailObj);
                  $customer = array(
                        'email' => 'l.kania@vp.pl',
                        'firstname' => 'łukasz',
                        'id' => 84,
                        'lastname' => 'KANIA',
                  );
                  $result = array(
                        'cartDetails' => $cartDetails,
                        'customer' => $customer,
                        'discountExtended' => false,
                        'payment' => "przelew bankowy",
                        'reference' => "000000103",
                        'totalPaid' => "70.00",
                        'totalPaidDiscount' => "59.50",
                        'totalProduct' => "70.00",
                        'totalProductDiscount' => "59.50",
                        'totalShipment' => "0.00",
                  );
            } elseif ($_GET['id'] == 104) {
                  $quantity1 = array(
                        'current' => 12,
                        'toUpdate' => 12,
                  );
                  $quantity2 = array(
                        'current' => 1,
                        'toUpdate' => 1,
                  );
                  $quantity3 = array(
                        'current' => 38,
                        'toUpdate' => 38,
                  );
                  $detailObj1 = array(
                        'attributeId' => 0,
                        'counter' => 1,
                        'cover' => "http://modele-ad9bis.pl/img/p/760-23182-thickbox.jpg",
                        'linkRewrite' => "tor-prosty-1-3-67mm-piko",
                        'productId' => 760,
                        'productName' => "Tor prosty 1/3 67mm PIKO",
                        'productQuantity' => 6,
                        'quantity' => $quantity1,
                        'reduction' => "---",
                        'totalPrice' => "1.20",
                        'totalPriceDiscount' => "1.02",
                        'unitPrice' => "1.20",
                        'unitPriceDiscount' => "1.02",
                  );
                  $detailObj2 = array(
                        'attributeId' => 0,
                        'counter' => 2,
                        'cover' => "http://modele-ad9bis.pl/img/p/1014-3148-thickbox.jpg",
                        'linkRewrite' => "tor-prosty-107-mm-piko",
                        'productId' => 1014,
                        'productName' => "Tor prosty 107 mm - PIKO",
                        'productQuantity' => 1,
                        'quantity' => $quantity2,
                        'reduction' => "---",
                        'totalPrice' => "1.50",
                        'totalPriceDiscount' => "1.28",
                        'unitPrice' => "1.50",
                        'unitPriceDiscount' => "1.28",
                  );
                  $detailObj3 = array(
                        'attributeId' => 0,
                        'counter' => 3,
                        'cover' => "http://modele-ad9bis.pl/img/p/507-6077-thickbox.jpg",
                        'linkRewrite' => "standartowy-tor-lukowy-2-3-piko",
                        'productId' => 507,
                        'productName' => "Łuk wyrównawczy 2/3 R 440 dawnego PIKO",
                        'productQuantity' => 6,
                        'quantity' => $quantity3,
                        'reduction' => "---",
                        'totalPrice' => "1.20",
                        'totalPriceDiscount' => "1.02",
                        'unitPrice' => "1.20",
                        'unitPriceDiscount' => "1.02",
                  );
                  $detailObj4 = array(
                        'attributeId' => 0,
                        'counter' => 4,
                        'cover' => "http://modele-ad9bis.pl/img/p/506-6073-thickbox.jpg",
                        'linkRewrite' => "standartowy-tor-wyrownawczy-piko",
                        'productId' => 506,
                        'productName' => "Łuk wyrównawczy 2/3 R 380 dawnego PIKO- nieużywany",
                        'productQuantity' => 6,
                        'quantity' => $quantity3,
                        'reduction' => "---",
                        'totalPrice' => "1.30",
                        'totalPriceDiscount' => "1.11",
                        'unitPrice' => "1.30",
                        'unitPriceDiscount' => "1.11",
                  );
                  $cartDetails = array($detailObj1, $detailObj2, $detailObj3, $detailObj4);
                  $customer = array(
                        'email' => 'kapt@kapt.com.pl',
                        'firstname' => 'Jarosław',
                        'id' => 85,
                        'lastname' => 'KUŚMIERCZYK',
                  );
                  $result = array(
                        'cartDetails' => $cartDetails,
                        'customer' => $customer,
                        'discountExtended' => false,
                        'payment' => "przelew bankowy",
                        'reference' => "000000104",
                        'totalPaid' => "31.70",
                        'totalPaidDiscount' => "26.95",
                        'totalProduct' => "23.70",
                        'totalProductDiscount' => "20.15",
                        'totalShipment' => "8.00",
                  );
            }
      } else {
            $result = null;
            if (isset($_GET['db']) && $_GET['db'] === 'old') {
                  $id = $_GET['id'] - 100;
                  if (isset($orderOld[$id])) {
                        $result = $orderOld[$id];
                  }
            } elseif (isset($_GET['db']) && $_GET['db'] === 'new') {  
                  $id = $_GET['id'] - 100;
                  if (isset($orderNew[$id])) {
                        $result = $orderNew[$id];
                  }     
            }
            if ($result === null) {
                  $result = array(
                        'success' => false,
                        'reason' => 'Brak zamowienia o ID:' . $_GET['id'],
                  );
            }
      }
      echo json_encode($result);
      exit();
} elseif (isset($_GET['action']) && $_GET['action'] === 'postal') {
      $item1 = array(
            'current' => "121.63",
            'date' => "2017-05-05 19:00:26",
            'number' => 1,
      );
      $item2 = array(
            'current' => "140.13",
            'date' => "2017-05-04 23:34:06",
            'number' => 2,
      );
      $item3 = array(
            'current' => "155.73",
            'date' => "2017-05-02 13:10:18",
            'number' => 3,
      );
      $item4 = array(
            'current' => "73.83",
            'date' => "2017-04-28 11:00:48",
            'number' => 4,
      );
      $item5 = array(
            'current' => "82.63",
            'date' => "2017-04-26 13:31:56",
            'number' => 5,
      );
      $list = array($item1, $item2, $item3, $item4, $item5);
      $result = array(
            'current' => "121.63",
            'list' => $list,
            'success' => true,
      );
} elseif (isset($_POST['update'])) {
      $result = $_POST['update'];
      $result['success'] = true;
}
if (!$result['success']) {
    $result = array('success' => false, 'reason' => 'No matches found!');
}
echo json_encode($result);
exit();