'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage, type LanguageCode } from '@/contexts/LanguageContext';

const translations = {
  ja: {
    hotelName: '',
    hotelTitle: 'ホテルエース盛岡',
    heroTitle: 'ホテル館内のご案内',
    welcomeMessage: '本日は「ホテルエース盛岡」をご利用いただき誠にありがとうございます。',
    welcomeMessage2: 'ご不明な点がございましたらフロントスタッフまでお気軽にお尋ねください。',
    restaurantCoupon: '飲食店クーポン',
    checkInOut: '入退館時間',
    bath: 'アメニティ',
    breakfast: '朝食',
    dinner: '夕食・お得なクーポン',
    service: 'サービスコーナー',
    wifi: 'Wi-Fi',
    lighting: '室内照明',
    longstay: '連泊のお客様へ',
    lost: 'お忘れ物について',
    quickCheckin: '快速チェックイン',
    dinnerTab: '夕食・お得なクーポン',
    serviceTab: 'サービスコーナー',
    close: '閉じる',
    checkIn: 'チェックイン',
    checkOut: 'チェックアウト',
    planNote: '※プランによって時間が異なる場合がございます。',
    bbhMember: 'BBH会員',
    earlyCheckin: 'アーリーチェックイン',
    earlyCheckinFee: '1時間につき1,000円（最大14:00まで）',
    lobbyDesc1: 'ヨーロピアン・アンティークの調度品が優雅なロビー。',
    lobbyDesc2: '都会の謙遜を忘れる落ち着いた空間です。',
    lobbyDesc3: '「スターバックス コーヒー」はロビーから直接お入りいただけます。',
    amenitiesTitle: '全部屋タイプ共通',
    amenitiesNote: '※アメニティは1Fにご用意しております。',
    amenityTowel: 'タオル',
    amenityBathTowel: 'バスタオル',
    amenityDryer: 'ドライヤー',
    amenityDeodorant: '消臭スプレー',
    amenityShampoo: 'シャンプー',
    amenityConditioner: 'リンス',
    amenityHandSoap: 'ハンドソープ',
    amenityToothbrush: 'ハミガキセット',
    amenityBodySoap: 'ボディーソープ',
    breakfastVenue: '朝食会場',
    breakfastFloor: '1階レストラン',
    breakfastTime: '営業時間',
    breakfastTimeDetail: '6:30～10:00（9:30最終入店）',
    breakfastDesc: 'バランス良く、栄養もしっかり摂れる30種類のバイキング',
    breakfastCatchphrase: '「華麗（カレー）なる朝食」を存分に味わってください！',
    breakfastNotice: '営業時間は予告なく変更となる場合もございます。',
    bathTitle: 'アメニティ',
    bathDescription: '男女別大浴場 9F',
    operatingHours: '営業時間:',
    bathHours: '15:00~翌10:00',
    saunaNote: '(サウナのみ1:00~5:00停止)',
    notice: 'ご注意',
    bathNotice1: '※タオル、アメニティは各自お部屋からお持ちください。',
    bathNotice2: '※女性大浴場へ入場する際は暗証番号が必要です。暗証番号はフロントにてお渡しします。',
    freeService: '無料サービス',
    bathServiceDesc: '乳酸菌飲料とアイスキャンディーを無料で提供しております。',
    breakfastTitle: 'ご朝食のご案内',
    breakfastPrice: '大人 1,200円（税込）／子供（小学生）800円（税込）',
    breakfastHours: '6:15~9:30 (最終入店9:00)',
    breakfastNote1: '※満席の場合はお待ちいただくことがございます。',
    breakfastNote2: '※混雑状況により営業時間を変更させていただく場合がございます。',
    sobaTitle: '■夜鳴きそば (ハーフサイズ) / 無料',
    sobaHours: '21:30~23:00',
    sobaNote: '※営業時間は変更になる場合がございます。',
    serviceTitle: 'サービスコーナー',
    floor1F: '■ 1F',
    freeSpaceNote: '（毎月第2・4土曜日 8:30～16:30 は中央通まちかどマルシェ開催の為、フリースペースはご利用いただけません）',
    freeSpace: 'フリースペース（WiFi・コンセント）',
    freeSpaceHours: 'ご利用時間帯 6:30～22:00',
    microwave: '電子レンジ',
    iwateSachiko: '岩手県公認VTuber「岩手さちこ」',
    wrappingVending: 'ラッピング自販機（初号機・4面ラッピング）',
    souvenirVending1: 'ご当地自販機（岩手のお土産）',
    souvenirVending2: 'ご当地自販機（お土産）',
    floor2F: '■ 2F',
    vendingMachine: '自動販売機（冷凍食品・ドリンク・アルコール）',
    iceMaker: '製氷機（別館3Fにもございます）',
    vendingMachineNote: '自動販売機は別館3F・6Fにもございます',
    laundry: 'コインランドリー',
    laundryHours: 'ご利用時間帯 10:00～22:00',
    alcoholNote: '(アルコール類は5・7・9F)',
    smoking: '喫煙コーナー',
    wifiTitle: 'Wi-Fi',
    password: 'Password :',
    wifiAccessPoint: 'アクセスポイントはお部屋に設置の「客室インターネットのご案内」をご覧くださいませ。',
    copy: 'コピー',
    wifiCopyNote: '※ボタンをタップするとパスワードをコピーできます',
    passwordCopied: 'パスワードをコピーしました！',
    lostTitle: 'お忘れ物',
    lostText1: 'お客様がチェックアウトしたあと、手荷物又は携帯品が当ホテルに保管の依頼が無く残置されていた場合、所有者が破棄したものとして当ホテルの規定に基づき処分させていただきます。',
    lostText2: '',
    lostText3: '',
    lightingTitle: '室内照明',
    lightingDesc: '入室後、入口脇の電源ソケットにお部屋のキーホルダーを差し込む事で室内照明は点灯致します。',
    lightingNote: '※キーを電源ソケットに差し込みます。',
    longstayTitle: '連泊のお客様へ',
    cleaningHours: '清掃時間は11:00～15:00までとなっております。',
    cleaningRequest: 'ご清掃をご希望の場合は、ドンデスカードの「清掃して下さい」を11:00までに外側ドアノブへ掛けて頂きますようお願いいたします。',
    sheetExchange: '清掃をご希望の方は緑のマグネット「清掃してください」を明朝9時までに入口ドア廊下側へ貼付してください。',
    noCleaning: '清掃不要の方は青のマグネット「起こさないでください」を入口ドア廊下側へ貼付してください。マグネットが貼られていない場合は清掃を行わず、タオル類のみドア前にご用意いたします。衛生面の観点から清掃は3日に1回（2泊目まではタオル類のみ交換、3泊目は清掃、4泊目以降は繰り返し）となります。',
    parking: '提携駐車場のご案内',
    parkingAllPrice: 'P1～P5は全て1泊900円（延長30分100円）',
    parkingMidExit: '※途中出庫の際は課金額が発生します。',
    parkingInquiry: '※時間帯によっては駐車場車庫がありますのでお問い合わせください。',
    parkingP1Name: 'P1 ホテルエース駐車場',
    parkingP2Name: 'P2 リリカ駐車場',
    parkingP3Name: 'P3 三井のリパーク',
    parkingP4Name: 'P4 MOSS駐車場',
    parkingP5Name: 'P5 クロステラス駐車場',
    parkingUsageTime: '■利用時間：',
    parkingP1Time: '15:00～翌11:00',
    parkingP4Time: '16:00～翌11:00',
    parkingP5Time: '17:00～翌11:00',
    parkingExtension: '※延長30分100円',
    parkingHeightLimit: '■車高制限：',
    parkingP2Height: '2.30mまで',
    parkingP4Height: '2.50mまで',
    parkingP5Height: '2.10mまで',
    parkingReservation: '■事前予約：利用なし',
    parkingFee: '駐車料金',
    heightLimit: '高さ制限',
    hours24: '24h営業',
    discountTime: '割引適用時間',
    parkingNote1: '※ワゴン車・RV車・ルーフキャリアをお付けの車等は、こちらをご利用下さい。',
    parkingDiscount1: '入庫から24h',
    parkingDiscount2: '入庫から24h（出し入れOK。申告制）',
    parkingDiscount3: '入庫から最大36h（電話予約、出し入れOK。）',
    parkingNote2: '※入庫から翌日19時までが1泊計算となります。（入庫は朝7時より可）',
    parkingNote3: '※バイク（事前予約）1泊600円。',
    parkingNote4: '※カーナビ検索の場合は022-223-3863の番号を入力して下さい。',
    officialHP: '公式HPはこちら',
    preparing: '詳細情報は準備中です。',
    dinnerCouponLine1: '今夜のご夕食にどうぞ',
    dinnerCouponLine2: 'お得な飲食店クーポン',
  },
  en: {
    hotelName: '',
    hotelTitle: 'Hotel Ace Morioka',
    heroTitle: 'Hotel Guide',
    welcomeMessage: 'Thank you very much for staying with us at Hotel Ace Morioka today.',
    welcomeMessage2: 'If you have any questions, please feel free to ask our front desk staff.',
    restaurantCoupon: 'Restaurant Coupon',
    checkInOut: 'Check-in/Check-out',
    bath: 'Public Bath',
    breakfast: 'Breakfast',
    dinner: 'Dinner & Coupons',
    service: 'Service Corner',
    wifi: 'Wi-Fi',
    lighting: 'Room Lighting',
    longstay: 'For Long-term Guests',
    lost: 'Lost & Found',
    quickCheckin: 'Quick Check-in',
    dinnerTab: 'Dinner & Coupons',
    serviceTab: 'Service Corner',
    close: 'Close',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '*Times may vary depending on the plan.',
    bbhMember: 'BBH Member',
    earlyCheckin: 'Early Check-in',
    earlyCheckinFee: '1,000 yen per hour (until 14:00)',
    lobbyDesc1: 'An elegant lobby with European antique furnishings.',
    lobbyDesc2: 'A calm space where you can forget the hustle and bustle of the city.',
    lobbyDesc3: 'You can enter "Starbucks Coffee" directly from the lobby.',
    amenitiesTitle: 'Common to all room types',
    amenitiesNote: '※Amenities are available on the 1st floor.',
    amenityTowel: 'Towel',
    amenityBathTowel: 'Bath towel',
    amenityDryer: 'Hair dryer',
    amenityDeodorant: 'Deodorizing spray',
    amenityShampoo: 'Shampoo',
    amenityConditioner: 'Conditioner',
    amenityHandSoap: 'Hand soap',
    amenityToothbrush: 'Toothbrush set',
    amenityBodySoap: 'Body soap',
    breakfastVenue: 'Breakfast Venue',
    breakfastFloor: '1st Floor Restaurant',
    breakfastTime: 'Operating Hours',
    breakfastTimeDetail: '6:30-10:00 (Last entry 9:30)',
    breakfastDesc: 'Enjoy a well-balanced buffet with 30 varieties for proper nutrition',
    breakfastCatchphrase: 'Experience our "Gorgeous Curry Breakfast" to the fullest!',
    breakfastNotice: 'Operating hours are subject to change without notice.',
    bathTitle: 'Public Bath',
    bathDescription: 'Separate men\'s and women\'s public bath 9F',
    operatingHours: 'Operating Hours:',
    bathHours: '15:00~Next day 10:00',
    saunaNote: '(Sauna only: 1:00~5:00 closed)',
    notice: 'Notice',
    bathNotice1: '*Please bring your own towels and amenities from your room.',
    bathNotice2: '*A passcode is required to enter the women\'s public bath. The passcode will be provided at the front desk.',
    freeService: 'Free Service',
    bathServiceDesc: 'We provide free lactic acid drinks and ice candy.',
    breakfastTitle: 'Breakfast (1F Restaurant)',
    breakfastPrice: '/ $2,300',
    breakfastHours: '6:15~9:30 (Last entry 9:00)',
    breakfastNote1: '*You may be asked to wait if the restaurant is full.',
    breakfastNote2: '*Operating hours may change depending on congestion.',
    serviceTitle: 'Service Corner',
    floor1F: '■ 1F',
    freeSpaceNote: '(Free space is unavailable on the 2nd and 4th Saturdays of every month from 8:30 to 16:30 due to the Chuo-dori Machikado Marche event)',
    freeSpace: 'Free Space (WiFi & Power outlets)',
    freeSpaceHours: 'Available hours: 6:30～22:00',
    microwave: 'Microwave',
    iwateSachiko: 'Iwate Prefecture Official VTuber "Iwate Sachiko"',
    wrappingVending: 'Wrapped vending machine (First unit, 4-sided wrap)',
    souvenirVending1: 'Local vending machine (Iwate souvenirs)',
    souvenirVending2: 'Local vending machine (Souvenirs)',
    floor2F: '■ 2F',
    vendingMachine: 'Vending machines (Frozen food, drinks, alcohol)',
    iceMaker: 'Ice maker (Also available on Annex 3F)',
    vendingMachineNote: 'Vending machines are also available on Annex 3F and 6F',
    laundry: 'Coin laundry',
    laundryHours: 'Available hours: 10:00～22:00',
    alcoholNote: '(Alcoholic beverages: 5F, 9F)',
    smoking: 'Smoking Area',
    wifiTitle: 'Wi-Fi',
    password: 'Password:',
    wifiAccessPoint: 'Please check the "Guest Room Internet Guide" installed in your room for the access point.',
    copy: 'Copy',
    wifiCopyNote: '※You can copy the password by tapping the button',
    passwordCopied: 'Password copied!',
    lostTitle: 'Lost & Found',
    lostText1: 'If luggage or personal belongings are left behind at our hotel without a request for storage after checkout, they will be disposed of in accordance with hotel regulations, assuming the owner has discarded them.',
    lostText2: '',
    lostText3: '',
    lightingTitle: 'Room Lighting',
    lightingDesc: 'After entering the room, insert your room key holder into the power socket next to the entrance to turn on the room lighting.',
    lightingNote: '*Insert the key into the power socket.',
    longstayTitle: 'For Long-term Guests',
    cleaningHours: 'Cleaning hours are from 11:00 to 15:00.',
    cleaningRequest: 'If you wish for cleaning, please hang the Dondes card \"Please clean\" on the outside doorknob by 11:00.',
    sheetExchange: 'Guests who wish to exchange sheets, futon covers, and pillowcases, please display the \"WECO Card\" on the bed. We will not exchange them if the card is not displayed. (We will exchange towels and room wear.)',
    noCleaning: 'Guests who do not need cleaning, please display the green \"WECO\" card on the corridor side, which is located on the inside of the entrance door. In that case, we will not clean or enter the room.',
    parking: 'Partner Parking Information',
    parkingAllPrice: 'P1～P5: All 900 yen per night (Extension: 100 yen per 30 minutes)',
    parkingMidExit: '※Charges will apply if you exit mid-stay.',
    parkingInquiry: '※Please inquire as parking may be full depending on the time.',
    parkingP1Name: 'P1 Hotel Ace Parking',
    parkingP2Name: 'P2 Ririka Parking',
    parkingP3Name: 'P3 Mitsui Re-Park',
    parkingP4Name: 'P4 MOSS Parking',
    parkingP5Name: 'P5 Cross Terrace Parking',
    parkingUsageTime: '■Usage Hours:',
    parkingP1Time: '15:00～Next day 11:00',
    parkingP4Time: '16:00～Next day 11:00',
    parkingP5Time: '17:00～Next day 11:00',
    parkingExtension: '※Extension: 100 yen per 30 minutes',
    parkingHeightLimit: '■Height Limit:',
    parkingP2Height: 'Up to 2.30m',
    parkingP4Height: 'Up to 2.50m',
    parkingP5Height: 'Up to 2.10m',
    parkingReservation: '■Advance Reservation: Not available',
    parkingFee: 'Parking Fee',
    heightLimit: 'Height Limit',
    hours24: 'Open 24h',
    discountTime: 'Discount Period',
    parkingNote1: '*Please use this for wagons, RVs, and vehicles with roof carriers.',
    parkingDiscount1: '24h from entry',
    parkingDiscount2: '24h from entry (In/out OK, declaration required)',
    parkingDiscount3: 'Up to 36h from entry (Phone reservation, in/out OK)',
    parkingNote2: '*One night is calculated from entry until 7PM the next day (Entry available from 7AM)',
    parkingNote3: '*Motorcycle (advance reservation) 600 yen per night.',
    parkingNote4: '*For car navigation search, please enter 022-223-3863.',
    officialHP: 'Official Website',
    preparing: 'Detailed information is being prepared.',
    dinnerCouponLine1: 'For tonight\'s dinner',
    dinnerCouponLine2: 'Great restaurant coupons',
  },
  zh: {
    hotelName: '',
    hotelTitle: '盛冈Ace酒店',
    heroTitle: '酒店馆内指南',
    welcomeMessage: '感谢您今天入住"盛冈Ace酒店"。',
    welcomeMessage2: '如有任何疑问，请随时咨询前台工作人员。',
    restaurantCoupon: '餐饮优惠券',
    checkInOut: '入住/退房时间',
    bath: '大堂・设施',
    breakfast: '早餐',
    dinner: '晚餐・优惠券',
    service: '服务区',
    wifi: 'Wi-Fi',
    lighting: '室内照明',
    longstay: '连住客人须知',
    lost: '遗失物品',
    quickCheckin: '快速入住',
    dinnerTab: '晚餐・优惠券',
    serviceTab: '服务区',
    close: '关闭',
    checkIn: '入住',
    checkOut: '退房',
    planNote: '※根据预订方案，时间可能有所不同。',
    bbhMember: 'BBH会员',
    earlyCheckin: '提前入住',
    earlyCheckinFee: '每小时1,000日元（最晚14:00）',
    lobbyDesc1: '欧式古董家具装饰的优雅大堂。',
    lobbyDesc2: '让您忘却都市喧嚣的宁静空间。',
    lobbyDesc3: '可从大堂直接进入"星巴克咖啡"。',
    breakfastVenue: '早餐会场',
    breakfastFloor: '1楼餐厅',
    breakfastTime: '营业时间',
    breakfastTimeDetail: '6:00～9:00（最终入店8:45）',
    breakfastDesc: '可享用使用岩手当地食材、营养丰富的自助早餐。',
    breakfastNotice: '营业时间可能会在不另行通知的情况下更改。',
    bathTitle: '大堂・设施',
    bathDescription: '男女分开大浴场 9F',
    operatingHours: '营业时间：',
    bathHours: '15:00~次日10:00',
    saunaNote: '(仅桑拿 1:00~5:00停止)',
    notice: '注意事项',
    bathNotice1: '※请自行从房间携带毛巾和洗漱用品。',
    bathNotice2: '※进入女性大浴场需要密码。密码将在前台提供。',
    freeService: '免费服务',
    bathServiceDesc: '我们免费提供乳酸菌饮料和冰棒。',
    breakfastTitle: '早餐（1F 餐厅）',
    breakfastPrice: '成人 1,200日元（含税）／儿童（小学生）800日元（含税）',
    breakfastHours: '6:15~9:30（最后入场9:00）',
    breakfastNote1: '※满座时可能需要等待。',
    breakfastNote2: '※根据拥挤情况，营业时间可能会有所调整。',
    serviceTitle: '服务区',
    vendingMachine: '自动售货机（冷冻食品・饮料・酒精）',
    alcoholNote: '(酒精饮料在5・7・9F)',
    microwave: '微波炉',
    iceMaker: '制冰机（别馆3F也有）',
    smoking: '吸烟区',
    trouserPress: '裤子熨烫机',
    trouserPressLocation: '各楼层电梯前',
    laundry: '投币式洗衣房',
    laundryNote: '※洗衣机/每次200日元 烘干机/10分钟100日元（洗涤剂在前台免费提供）',
    wifiTitle: 'Wi-Fi',
    password: '密码：',
    wifiAccessPoint: '请查看您房间内设置的「客房互联网指南」以了解接入点。',
    copy: '复制',
    wifiCopyNote: '※点击按钮即可复制密码',
    passwordCopied: '密码已复制！',
    lostTitle: '遗失物品',
    lostText1: '原则上，酒店不会就遗失物品联系客人。',
    lostText2: '如果没有联系，根据遗失物品法，将在3个月后处理。',
    lostText3: '但是，食品饮料将在当天处理。',
    lightingTitle: '室内照明',
    lightingDesc: '进入房间后，将房间钥匙扣插入入口旁的电源插座即可点亮室内照明。',
    lightingNote: '※将钥匙插入电源插座。',
    longstayTitle: '连住客人须知',
    cleaningHours: '清扫时间为11:00～15:00。',
    cleaningRequest: '如需清扫，请在11:00前将Dondes卡"请清扫"挂在门外侧门把手上。',
    sheetExchange: '如需清扫，请在早上9点前将绿色磁铁"请打扫"贴在门外走廊侧。',
    noCleaning: '如不需要清扫，请将蓝色磁铁"请勿打扰"贴在门外走廊侧。如果没有贴磁铁，我们将不进行清扫，仅在门前准备毛巾类物品。出于卫生考虑，清扫为每3天1次（前2晚仅更换毛巾类，第3晚清扫，第4晚以后重复）。',
    parking: '合作停车场信息',
    parkingAllPrice: 'P1～P5：全部一晚900日元（延长30分钟100日元）',
    parkingMidExit: '※中途出库时会产生费用。',
    parkingInquiry: '※根据时间段，停车场可能满库，请咨询。',
    parkingP1Name: 'P1 盛冈Ace酒店停车场',
    parkingP2Name: 'P2 利利卡停车场',
    parkingP3Name: 'P3 三井Re-Park',
    parkingP4Name: 'P4 MOSS停车场',
    parkingP5Name: 'P5 Cross Terrace停车场',
    parkingUsageTime: '■使用时间：',
    parkingP1Time: '15:00～次日11:00',
    parkingP4Time: '16:00～次日11:00',
    parkingP5Time: '17:00～次日11:00',
    parkingExtension: '※延长30分钟100日元',
    parkingHeightLimit: '■车高限制：',
    parkingP2Height: '2.30m以下',
    parkingP4Height: '2.50m以下',
    parkingP5Height: '2.10m以下',
    parkingReservation: '■提前预约：不可用',
    parkingFee: '停车费',
    heightLimit: '高度限制',
    hours24: '24小时营业',
    discountTime: '折扣适用时间',
    parkingNote1: '※货车、RV车、带车顶行李架的车辆等，请使用此处。',
    parkingDiscount1: '入库后24小时',
    parkingDiscount2: '入库后24小时（可出入。需申报）',
    parkingDiscount3: '入库后最多36小时（电话预约、可出入）',
    parkingNote2: '※从入库到次日19点为一晚计算。（入库可从早上7点开始）',
    parkingNote3: '※摩托车（需提前预约）一晚600日元。',
    parkingNote4: '※导航搜索时请输入022-223-3863。',
    officialHP: '官方网站',
    preparing: '详细信息正在准备中。',
    dinnerCouponLine1: '今晚的晚餐',
    dinnerCouponLine2: '超值餐饮优惠券',
    amenitiesTitle: '全部屋类型共通',
    amenitiesNote: '※设施用品在1楼准备。',
    amenityTowel: '毛巾',
    amenityBathTowel: '浴巾',
    amenityDryer: '吹风机',
    amenityDeodorant: '除臭喷雾',
    amenityShampoo: '洗发水',
    amenityConditioner: '护发素',
    amenityHandSoap: '洗手液',
    amenityToothbrush: '牙刷套装',
    amenityBodySoap: '沐浴露',
    floor1F: '■ 1F',
    floor2F: '■ 2F',
    freeSpaceNote: '（每月第2・4个周六 8:30～16:30 因中央通街角集市举办，自由空间无法使用）',
    freeSpace: '自由空间（WiFi・插座）',
    freeSpaceHours: '使用时间段 6:30～22:00',
    iwateSachiko: '岩手县公认VTuber「岩手さちこ」',
    wrappingVending: '包装自动售货机（初号机・4面包装）',
    souvenirVending1: '当地自动售货机（岩手特产）',
    souvenirVending2: '当地自动售货机（特产）',
    vendingMachineNote: '自动售货机在别馆3F・6F也有',
    laundryHours: '使用时间段 10:00～22:00',
  },
  ko: {
    hotelName: '',
    hotelTitle: '호텔 에이스 모리오카',
    heroTitle: '호텔 관내 안내',
    welcomeMessage: '오늘 "호텔 에이스 모리오카"를 이용해 주셔서 진심으로 감사드립니다.',
    welcomeMessage2: '궁금하신 점이 있으시면 프런트 데스크 직원에게 언제든지 문의해 주세요.',
    restaurantCoupon: '음식점 쿠폰',
    checkInOut: '입실/퇴실 시간',
    bath: '로비・시설',
    breakfast: '조식',
    dinner: '석식・할인 쿠폰',
    service: '서비스 코너',
    wifi: 'Wi-Fi',
    lighting: '실내 조명',
    longstay: '연박 고객 안내',
    lost: '분실물 안내',
    quickCheckin: '빠른 체크인',
    dinnerTab: '석식・할인 쿠폰',
    serviceTab: '서비스 코너',
    close: '닫기',
    checkIn: '체크인',
    checkOut: '체크아웃',
    planNote: '※플랜에 따라 시간이 다를 수 있습니다.',
    bbhMember: 'BBH 회원',
    earlyCheckin: '얼리 체크인',
    earlyCheckinFee: '시간당 1,000엔 (최대 14:00까지)',
    lobbyDesc1: '유럽풍 앤티크 가구가 우아한 로비.',
    lobbyDesc2: '도시의 번잡함을 잊게 하는 편안한 공간입니다.',
    lobbyDesc3: '"스타벅스 커피"는 로비에서 직접 입장하실 수 있습니다.',
    breakfastVenue: '조식 장소',
    breakfastFloor: '1층 레스토랑',
    breakfastTime: '운영 시간',
    breakfastTimeDetail: '6:00～9:00 (최종 입장 8:45)',
    breakfastDesc: '이와테 현지 식재료를 활용한 영양 만점 조식 뷔페를 즐기실 수 있습니다。',
    breakfastNotice: '운영 시간은 예고 없이 변경될 수 있습니다.',
    bathTitle: '로비・시설',
    bathDescription: '남녀 분리 대욕장 9F',
    operatingHours: '운영 시간:',
    bathHours: '15:00~다음날 10:00',
    saunaNote: '(사우나만 1:00~5:00 정지)',
    notice: '주의사항',
    bathNotice1: '※타월과 어메니티는 각자 객실에서 가져오세요.',
    bathNotice2: '※여성 대욕장 입장 시 비밀번호가 필요합니다. 비밀번호는 프런트에서 제공합니다.',
    freeService: '무료 서비스',
    bathServiceDesc: '유산균 음료와 아이스 캔디를 무료로 제공합니다.',
    breakfastTitle: '조식 (1F 레스토랑)',
    breakfastPrice: '성인 1,200엔(세금 포함) / 어린이(초등학생) 800엔(세금 포함)',
    breakfastHours: '6:15~9:30 (최종 입장 9:00)',
    breakfastNote1: '※만석일 경우 대기하셔야 할 수 있습니다.',
    breakfastNote2: '※혼잡 상황에 따라 영업 시간이 변경될 수 있습니다.',
    serviceTitle: '서비스 코너',
    vendingMachine: '자동판매기（냉동식품・음료・알코올）',
    alcoholNote: '(주류는 5・7・9F)',
    microwave: '전자레인지',
    iceMaker: '제빙기（별관 3F에도 있습니다）',
    smoking: '흡연 코너',
    trouserPress: '바지 다림질기',
    trouserPressLocation: '각 층 엘리베이터 앞',
    laundry: '코인 세탁소',
    laundryNote: '※세탁기/1회 200엔 건조기/10분 100엔 (세제는 프런트에서 무료 배포)',
    wifiTitle: 'Wi-Fi',
    password: '비밀번호:',
    wifiAccessPoint: '액세스 포인트는 객실에 설치된「객실 인터넷 안내」를 참고해 주세요.',
    copy: '복사',
    wifiCopyNote: '※버튼을 탭하면 비밀번호를 복사할 수 있습니다',
    passwordCopied: '비밀번호를 복사했습니다!',
    lostTitle: '분실물',
    lostText1: '분실물에 대해서는 원칙적으로 호텔에서 연락하지 않습니다.',
    lostText2: '또한 연락이 없는 경우 유실물법에 따라 3개월 경과 후 처분됩니다.',
    lostText3: '단, 음식물에 대해서는 당일 처분됩니다.',
    lightingTitle: '실내 조명',
    lightingDesc: '입실 후 입구 옆 전원 소켓에 객실 키홀더를 꽂으면 실내 조명이 켜집니다.',
    lightingNote: '※키를 전원 소켓에 꽂습니다.',
    longstayTitle: '연박 고객 안내',
    cleaningHours: '청소 시간은 11:00～15:00까지입니다.',
    cleaningRequest: '청소를 원하시는 경우, 돈데스 카드 "청소해 주세요"를 11:00까지 외부 도어 손잡이에 걸어 주시기 바랍니다.',
    sheetExchange: '청소를 희망하시는 분은 초록색 마그넷 "청소해 주세요"를 아침 9시까지 입구 도어 복도 쪽에 부착해 주세요.',
    noCleaning: '청소가 필요 없으신 분은 파란색 마그넷 "깨우지 마세요"를 입구 도어 복도 쪽에 부착해 주세요. 마그넷이 부착되지 않은 경우 청소를 하지 않고 타월류만 도어 앞에 준비합니다. 위생상의 관점에서 청소는 3일에 1회(2박까지는 타월류만 교환, 3박째는 청소, 4박째 이후는 반복)입니다.',
    parking: '제휴 주차장 안내',
    parkingAllPrice: 'P1～P5 모두 1박 900엔（연장 30분 100엔）',
    parkingMidExit: '※중간 출고 시 요금이 발생합니다.',
    parkingInquiry: '※시간대에 따라 주차장이 만차일 수 있으니 문의해 주세요.',
    parkingP1Name: 'P1 호텔 에이스 주차장',
    parkingP2Name: 'P2 리리카 주차장',
    parkingP3Name: 'P3 미쓰이 리파크',
    parkingP4Name: 'P4 MOSS 주차장',
    parkingP5Name: 'P5 크로스 테라스 주차장',
    parkingUsageTime: '■이용 시간：',
    parkingP1Time: '15:00～다음날 11:00',
    parkingP4Time: '16:00～다음날 11:00',
    parkingP5Time: '17:00～다음날 11:00',
    parkingExtension: '※연장 30분 100엔',
    parkingHeightLimit: '■차고 제한：',
    parkingP2Height: '2.30m까지',
    parkingP4Height: '2.50m까지',
    parkingP5Height: '2.10m까지',
    parkingReservation: '■사전 예약：이용 불가',
    parkingFee: '주차 요금',
    heightLimit: '높이 제한',
    hours24: '24시간 영업',
    discountTime: '할인 적용 시간',
    parkingNote1: '※왜건, RV차, 루프 캐리어를 부착한 차량 등은 이곳을 이용해 주세요.',
    parkingDiscount1: '입고 후 24시간',
    parkingDiscount2: '입고 후 24시간 (출입 가능. 신고제)',
    parkingDiscount3: '입고 후 최대 36시간 (전화 예약, 출입 가능)',
    parkingNote2: '※입고 후 다음날 19시까지가 1박 계산입니다. (입고는 아침 7시부터 가능)',
    parkingNote3: '※오토바이 (사전 예약) 1박 600엔.',
    parkingNote4: '※내비게이션 검색 시 022-223-3863 번호를 입력하세요.',
    officialHP: '공식 홈페이지',
    preparing: '상세 정보를 준비 중입니다.',
    dinnerCouponLine1: '오늘 밤 저녁식사',
    dinnerCouponLine2: '특가 음식점 쿠폰',
    amenitiesTitle: '전 객실 타입 공통',
    amenitiesNote: '※어메니티는 1F에 준비되어 있습니다.',
    amenityTowel: '타월',
    amenityBathTowel: '목욕 타월',
    amenityDryer: '드라이어',
    amenityDeodorant: '탈취 스프레이',
    amenityShampoo: '샴푸',
    amenityConditioner: '린스',
    amenityHandSoap: '핸드 소프',
    amenityToothbrush: '양치 세트',
    amenityBodySoap: '바디 소프',
    floor1F: '■ 1F',
    floor2F: '■ 2F',
    freeSpaceNote: '（매월 제2・제4 토요일 8:30～16:30은 중앙통 마치카도 마르셰 개최로 인해 프리 스페이스는 이용하실 수 없습니다）',
    freeSpace: '프리 스페이스（WiFi・콘센트）',
    freeSpaceHours: '이용 시간대 6:30～22:00',
    iwateSachiko: '이와테현 공인 VTuber「이와테 사치코」',
    wrappingVending: '래핑 자동판매기（초호기・4면 래핑）',
    souvenirVending1: '현지 자동판매기（이와테 특산품）',
    souvenirVending2: '현지 자동판매기（특산품）',
    vendingMachineNote: '자동판매기는 별관 3F・6F에도 있습니다',
    laundryHours: '이용 시간대 10:00～22:00',
  },
  fr: {
    hotelName: '',
    hotelTitle: 'Dormy Inn Sendai ANNEX',
    heroTitle: 'Guide de l\'hôtel',
    welcomeMessage: 'Merci beaucoup d\'avoir séjourné aujourd\'hui.',
    welcomeMessage2: 'Si vous avez des questions, n\'hésitez pas à contacter notre réception.',
    restaurantCoupon: 'Coupon Restaurant',
    checkInOut: 'Enregistrement/Départ',
    bath: 'Bain public',
    breakfast: 'Petit-déjeuner',
    dinner: 'Dîner & Coupons',
    service: 'Coin Service',
    wifi: 'Wi-Fi',
    lighting: 'Éclairage intérieur',
    longstay: 'Pour les clients longue durée',
    lost: 'Objets trouvés',
    quickCheckin: 'Check-in rapide',
    dinnerTab: 'Dîner & Coupons',
    serviceTab: 'Coin Service',
    close: 'Fermer',
    checkIn: 'Enregistrement',
    checkOut: 'Départ',
    planNote: '*Les heures peuvent varier selon le plan.',
    bbhMember: 'Membre BBH',
    earlyCheckin: 'Enregistrement anticipé',
    earlyCheckinFee: '1 000 yens par heure (jusqu\'à 14h00)',
    lobbyDesc1: 'Un hall élégant avec des meubles anciens européens.',
    lobbyDesc2: 'Un espace calme où vous pouvez oublier l\'agitation de la ville.',
    lobbyDesc3: 'Vous pouvez entrer dans "Starbucks Coffee" directement depuis le hall.',
    breakfastVenue: 'Lieu du petit-déjeuner',
    breakfastFloor: '10ème étage',
    breakfastTime: 'Horaires',
    breakfastTimeDetail: '6:45～9:00 (dernière entrée 8:45)',
    breakfastDesc: 'Profitez d\'un buffet petit-déjeuner nutritif avec des ingrédients locaux.',
    breakfastNotice: 'Les horaires sont susceptibles de changer sans préavis.',
    bathTitle: 'Bain public',
    bathDescription: 'Bain public séparé hommes/femmes 9F',
    operatingHours: 'Heures d\'ouverture:',
    bathHours: '15:00~Le lendemain 10:00',
    saunaNote: '(Sauna uniquement: 1:00~5:00 fermé)',
    notice: 'Avis',
    bathNotice1: '*Veuillez apporter vos propres serviettes et articles de toilette depuis votre chambre.',
    bathNotice2: '*Un code d\'accès est requis pour entrer dans le bain public des femmes. Le code sera fourni à la réception.',
    freeService: 'Service gratuit',
    bathServiceDesc: 'Nous fournissons gratuitement des boissons lactiques et des bonbons glacés.',
    breakfastTitle: 'Petit-déjeuner (Restaurant 1F)',
    breakfastPrice: '/ ¥2,300',
    breakfastHours: '6:15~9:30 (Dernière entrée 9:00)',
    breakfastNote1: '*Vous pourriez être invité à attendre si le restaurant est complet.',
    breakfastNote2: '*Les heures d\'ouverture peuvent changer selon l\'affluence.',
    serviceTitle: 'Coin Service',
    vendingMachine: 'Distributeurs automatiques (Aliments surgelés, boissons, alcool)',
    alcoholNote: '(Boissons alcoolisées: 5F, 9F)',
    microwave: 'Micro-ondes',
    iceMaker: 'Machine à glaçons (Aussi disponible au bâtiment annexe 3F)',
    smoking: 'Espace fumeur',
    trouserPress: 'Presse-pantalon',
    trouserPressLocation: 'Devant l\'ascenseur à chaque étage',
    laundry: 'Laverie automatique',
    laundryNote: '*Détergent, machine à laver/gratuit, sèche-linge/payant (¥100 par 30 minutes)',
    wifiTitle: 'Wi-Fi',
    password: 'Mot de passe:',
    wifiAccessPoint: 'Veuillez consulter le "Guide Internet de la chambre" installé dans votre chambre pour le point d\'accès.',
    copy: 'Copier',
    wifiCopyNote: '※Vous pouvez copier le mot de passe en appuyant sur le bouton',
    passwordCopied: 'Mot de passe copié !',
    lostTitle: 'Objets trouvés',
    lostText1: 'En principe, l\'hôtel ne vous contactera pas concernant les objets perdus.',
    lostText2: 'Si non contact, les objets seront éliminés après 3 mois conformément à la Loi sur les objets perdus.',
    lostText3: 'Cependant, les aliments et boissons seront éliminés le jour même.',
    lightingTitle: 'Éclairage intérieur',
    lightingDesc: 'Après être entré dans la chambre, insérez le porte-clés de votre chambre dans la prise électrique à côté de l\'entrée pour allumer l\'éclairage de la chambre.',
    lightingNote: '*Insérez la clé dans la prise électrique.',
    longstayTitle: 'Pour les clients longue durée',
    cleaningHours: 'Les heures de nettoyage sont de 11:00 à 15:00.',
    cleaningRequest: 'Si vous souhaitez un nettoyage, veuillez accrocher la carte Dondes \"Veuillez nettoyer\" sur la poignée de porte extérieure avant 11:00.',
    sheetExchange: 'Les clients qui souhaitent échanger les draps, housses de futon et taies d\'oreiller, veuillez afficher la \"Carte WECO\" sur le lit. Nous ne les échangerons pas si la carte n\'est pas affichée. (Nous échangerons les serviettes et les vêtements de chambre.)',
    noCleaning: 'Les clients qui n\'ont pas besoin de nettoyage, veuillez afficher la carte verte \"WECO\" du côté du couloir, qui se trouve à l\'intérieur de la porte d\'entrée. Dans ce cas, nous ne nettoierons pas et n\'entrerons pas dans la chambre.',
    parking: 'Informations sur les parkings partenaires',
    parkingAllPrice: 'P1～P5: Tous 900 yens par nuit (Prolongation: 100 yens par 30 minutes)',
    parkingMidExit: '※Des frais s\'appliqueront si vous sortez en cours de séjour.',
    parkingInquiry: '※Veuillez vous renseigner car le parking peut être complet selon l\'heure.',
    parkingP1Name: 'P1 Parking Hotel Ace',
    parkingP2Name: 'P2 Parking Ririka',
    parkingP3Name: 'P3 Mitsui Re-Park',
    parkingP4Name: 'P4 Parking MOSS',
    parkingP5Name: 'P5 Parking Cross Terrace',
    parkingUsageTime: '■Heures d\'utilisation:',
    parkingP1Time: '15:00～Le lendemain 11:00',
    parkingP4Time: '16:00～Le lendemain 11:00',
    parkingP5Time: '17:00～Le lendemain 11:00',
    parkingExtension: '※Prolongation: 100 yens par 30 minutes',
    parkingHeightLimit: '■Limite de hauteur:',
    parkingP2Height: 'Jusqu\'à 2.30m',
    parkingP4Height: 'Jusqu\'à 2.50m',
    parkingP5Height: 'Jusqu\'à 2.10m',
    parkingReservation: '■Réservation à l\'avance: Non disponible',
    officialHP: 'Site Web officiel',
    preparing: 'Les informations détaillées sont en cours de préparation.',
    dinnerCouponLine1: 'Pour le dîner de ce soir',
    dinnerCouponLine2: 'Coupons restaurant exceptionnels',
    amenitiesTitle: 'Commun à tous les types de chambres',
    amenitiesNote: '※Les équipements sont disponibles au 1er étage.',
    amenityTowel: 'Serviette',
    amenityBathTowel: 'Serviette de bain',
    amenityDryer: 'Sèche-cheveux',
    amenityDeodorant: 'Spray désodorisant',
    amenityShampoo: 'Shampooing',
    amenityConditioner: 'Après-shampooing',
    amenityHandSoap: 'Savon pour les mains',
    amenityToothbrush: 'Set de brossage',
    amenityBodySoap: 'Savon pour le corps',
    floor1F: '■ 1F',
    floor2F: '■ 2F',
    freeSpaceNote: '(L\'espace libre n\'est pas disponible les 2e et 4e samedis de chaque mois de 8:30 à 16:30 en raison de l\'événement Chuo-dori Machikado Marche)',
    freeSpace: 'Espace libre (WiFi & Prises)',
    freeSpaceHours: 'Heures disponibles: 6:30～22:00',
    iwateSachiko: 'VTuber officiel de la préfecture d\'Iwate "Iwate Sachiko"',
    wrappingVending: 'Distributeur automatique emballé (Première unité, emballage 4 faces)',
    souvenirVending1: 'Distributeur automatique local (Souvenirs d\'Iwate)',
    souvenirVending2: 'Distributeur automatique local (Souvenirs)',
    vendingMachineNote: 'Les distributeurs automatiques sont également disponibles au bâtiment annexe 3F et 6F',
    laundryHours: 'Heures disponibles: 10:00～22:00',
  },
  de: {
    hotelName: '',
    hotelTitle: 'Dormy Inn Sendai ANNEX',
    heroTitle: 'Hotel-Führer',
    welcomeMessage: 'Vielen Dank, dass Sie heute bei uns übernachtet haben.',
    welcomeMessage2: 'Wenn Sie Fragen haben, wenden Sie sich bitte an unsere Rezeption.',
    restaurantCoupon: 'Restaurant-Gutschein',
    checkInOut: 'Check-in/Check-out',
    bath: 'Öffentliches Bad',
    breakfast: 'Frühstück',
    dinner: 'Abendessen & Gutscheine',
    service: 'Service-Ecke',
    wifi: 'Wi-Fi',
    lighting: 'Raumbeleuchtung',
    longstay: 'Für Langzeitgäste',
    lost: 'Fundsachen',
    quickCheckin: 'Schnell-Check-in',
    dinnerTab: 'Abendessen & Gutscheine',
    serviceTab: 'Service-Ecke',
    close: 'Schließen',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '*Die Zeiten können je nach Plan variieren.',
    bbhMember: 'BBH-Mitglied',
    earlyCheckin: 'Früher Check-in',
    earlyCheckinFee: '1.000 Yen pro Stunde (bis 14:00 Uhr)',
    lobbyDesc1: 'Eine elegante Lobby mit europäischen Antikmöbeln.',
    lobbyDesc2: 'Ein ruhiger Raum, in dem Sie die Hektik der Stadt vergessen können.',
    lobbyDesc3: 'Sie können "Starbucks Coffee" direkt von der Lobby aus betreten.',
    breakfastVenue: 'Frühstücksort',
    breakfastFloor: '10. Stock',
    breakfastTime: 'Öffnungszeiten',
    breakfastTimeDetail: '6:45～9:00 (letzter Einlass 8:45)',
    breakfastDesc: 'Genießen Sie ein nahrhaftes Frühstücksbuffet mit lokalen Zutaten.',
    breakfastNotice: 'Die Öffnungszeiten können ohne Vorankündigung geändert werden.',
    bathTitle: 'Öffentliches Bad',
    bathDescription: 'Getrenntes Männer- und Frauenbad 9F',
    operatingHours: 'Öffnungszeiten:',
    bathHours: '15:00~Nächster Tag 10:00',
    saunaNote: '(Nur Sauna: 1:00~5:00 geschlossen)',
    notice: 'Hinweis',
    bathNotice1: '*Bitte bringen Sie Ihre eigenen Handtücher und Toilettenartikel aus Ihrem Zimmer mit.',
    bathNotice2: '*Ein Passcode ist erforderlich, um das Frauenbad zu betreten. Der Passcode wird an der Rezeption bereitgestellt.',
    freeService: 'Kostenloser Service',
    bathServiceDesc: 'Wir bieten kostenlos Milchsäuregetränke und Eisbonbons an.',
    breakfastTitle: 'Frühstück (Restaurant 1F)',
    breakfastPrice: '/ ¥2,300',
    breakfastHours: '6:15~9:30 (Letzter Einlass 9:00)',
    breakfastNote1: '*Sie könnten gebeten werden zu warten, wenn das Restaurant voll ist.',
    breakfastNote2: '*Die Öffnungszeiten können sich je nach Andrang ändern.',
    serviceTitle: 'Service-Ecke',
    vendingMachine: 'Automaten (Tiefkühlkost, Getränke, Alkohol)',
    alcoholNote: '(Alkoholische Getränke: 5F, 9F)',
    microwave: 'Mikrowelle',
    iceMaker: 'Eismaschine (Auch im Nebengebäude 3F verfügbar)',
    smoking: 'Raucherbereich',
    trouserPress: 'Hosenpresse',
    trouserPressLocation: 'Vor dem Aufzug auf jeder Etage',
    laundry: 'Münzwaschsalon',
    laundryNote: '*Waschmittel, Waschmaschine/kostenlos, Trockner/gebührenpflichtig (¥100 pro 30 Minuten)',
    wifiTitle: 'Wi-Fi',
    password: 'Passwort:',
    wifiAccessPoint: 'Bitte überprüfen Sie den "Gästezimmer-Internetführer" in Ihrem Zimmer für den Zugangspunkt.',
    copy: 'Kopieren',
    wifiCopyNote: '※Sie können das Passwort durch Tippen auf die Schaltfläche kopieren',
    passwordCopied: 'Passwort kopiert!',
    lostTitle: 'Fundsachen',
    lostText1: 'Grundsätzlich wird das Hotel Sie nicht bezüglich verlorener Gegenstände kontaktieren.',
    lostText2: 'Wenn kein Kontakt besteht, werden die Gegenstände nach 3 Monaten gemäß dem Fundrecht entsorgt.',
    lostText3: 'Lebensmittel und Getränke werden jedoch am selben Tag entsorgt.',
    lightingTitle: 'Raumbeleuchtung',
    lightingDesc: 'Nach dem Betreten des Zimmers stecken Sie den Zimmerschlüsselhalter in die Steckdose neben dem Eingang, um die Raumbeleuchtung einzuschalten.',
    lightingNote: '*Stecken Sie den Schlüssel in die Steckdose.',
    longstayTitle: 'Für Langzeitgäste',
    cleaningHours: 'Die Reinigungszeiten sind von 11:00 bis 15:00.',
    cleaningRequest: 'Wenn Sie eine Reinigung wünschen, hängen Sie bitte die Dondes-Karte \"Bitte reinigen\" bis 11:00 an die äußere Türklinke.',
    sheetExchange: 'Gäste, die Bettwäsche, Futonbezüge und Kissenbezüge wechseln möchten, bitte zeigen Sie die \"WECO-Karte\" auf dem Bett. Wir tauschen sie nicht aus, wenn die Karte nicht angezeigt wird. (Wir tauschen Handtücher und Nachtwäsche aus.)',
    noCleaning: 'Gäste, die keine Reinigung benötigen, bitte zeigen Sie die grüne \"WECO\"-Karte auf der Korridorseite, die sich an der Innenseite der Eingangstür befindet. In diesem Fall reinigen wir nicht und betreten das Zimmer nicht.',
    parking: 'Informationen zu Partnerparkhäusern',
    parkingAllPrice: 'P1～P5: Alle 900 Yen pro Nacht (Verlängerung: 100 Yen pro 30 Minuten)',
    parkingMidExit: '※Gebühren fallen an, wenn Sie während des Aufenthalts ausfahren.',
    parkingInquiry: '※Bitte erkundigen Sie sich, da der Parkplatz je nach Tageszeit voll sein kann.',
    parkingP1Name: 'P1 Hotel Ace Parkplatz',
    parkingP2Name: 'P2 Ririka Parkplatz',
    parkingP3Name: 'P3 Mitsui Re-Park',
    parkingP4Name: 'P4 MOSS Parkplatz',
    parkingP5Name: 'P5 Cross Terrace Parkplatz',
    parkingUsageTime: '■Nutzungszeiten:',
    parkingP1Time: '15:00～Am nächsten Tag 11:00',
    parkingP4Time: '16:00～Am nächsten Tag 11:00',
    parkingP5Time: '17:00～Am nächsten Tag 11:00',
    parkingExtension: '※Verlängerung: 100 Yen pro 30 Minuten',
    parkingHeightLimit: '■Höhenbegrenzung:',
    parkingP2Height: 'Bis zu 2.30m',
    parkingP4Height: 'Bis zu 2.50m',
    parkingP5Height: 'Bis zu 2.10m',
    parkingReservation: '■Vorausbuchung: Nicht verfügbar',
    officialHP: 'Offizielle Website',
    preparing: 'Detaillierte Informationen werden vorbereitet.',
    dinnerCouponLine1: 'Für das Abendessen heute',
    dinnerCouponLine2: 'Großartige Restaurant-Gutscheine',
    amenitiesTitle: 'Gemeinsam für alle Zimmertypen',
    amenitiesNote: '※Die Ausstattung ist im 1. Stock verfügbar.',
    amenityTowel: 'Handtuch',
    amenityBathTowel: 'Badetuch',
    amenityDryer: 'Haartrockner',
    amenityDeodorant: 'Deodorantspray',
    amenityShampoo: 'Shampoo',
    amenityConditioner: 'Conditioner',
    amenityHandSoap: 'Handseife',
    amenityToothbrush: 'Zahnbürstenset',
    amenityBodySoap: 'Körperseife',
    floor1F: '■ 1F',
    floor2F: '■ 2F',
    freeSpaceNote: '(Der freie Raum ist am 2. und 4. Samstag jedes Monats von 8:30 bis 16:30 aufgrund des Chuo-dori Machikado Marche-Events nicht verfügbar)',
    freeSpace: 'Freier Raum (WiFi & Steckdosen)',
    freeSpaceHours: 'Verfügbare Stunden: 6:30～22:00',
    iwateSachiko: 'Offizieller VTuber der Präfektur Iwate "Iwate Sachiko"',
    wrappingVending: 'Verpackter Automat (Erste Einheit, 4-seitige Verpackung)',
    souvenirVending1: 'Lokaler Automat (Iwate-Souvenirs)',
    souvenirVending2: 'Lokaler Automat (Souvenirs)',
    vendingMachineNote: 'Automaten sind auch im Nebengebäude 3F und 6F verfügbar',
    laundryHours: 'Verfügbare Stunden: 10:00～22:00',
  },
  es: {
    hotelName: '',
    hotelTitle: 'Dormy Inn Sendai ANNEX',
    heroTitle: 'Guía del hotel',
    welcomeMessage: 'Muchas gracias por alojarse con nosotros hoy.',
    welcomeMessage2: 'Si tiene alguna pregunta, no dude en consultar a nuestro personal de recepción.',
    restaurantCoupon: 'Cupón de restaurante',
    checkInOut: 'Registro/Salida',
    bath: 'Baño público',
    breakfast: 'Desayuno',
    dinner: 'Cena & Cupones',
    service: 'Rincón de servicio',
    wifi: 'Wi-Fi',
    lighting: 'Iluminación interior',
    longstay: 'Para huéspedes de larga estancia',
    lost: 'Objetos perdidos',
    quickCheckin: 'Check-in rápido',
    dinnerTab: 'Cena & Cupones',
    serviceTab: 'Rincón de servicio',
    close: 'Cerrar',
    checkIn: 'Registro',
    checkOut: 'Salida',
    planNote: '*Los horarios pueden variar según el plan.',
    bbhMember: 'Miembro BBH',
    earlyCheckin: 'Check-in temprano',
    earlyCheckinFee: '1.000 yenes por hora (hasta las 14:00)',
    lobbyDesc1: 'Un vestíbulo elegante con muebles antiguos europeos.',
    lobbyDesc2: 'Un espacio tranquilo donde puede olvidar el ajetreo de la ciudad.',
    lobbyDesc3: 'Puede entrar a "Starbucks Coffee" directamente desde el vestíbulo.',
    breakfastVenue: 'Lugar del desayuno',
    breakfastFloor: 'Piso 10',
    breakfastTime: 'Horario',
    breakfastTimeDetail: '6:45～9:00 (última entrada 8:45)',
    breakfastDesc: 'Disfrute de un buffet de desayuno nutritivo con ingredientes locales.',
    breakfastNotice: 'El horario está sujeto a cambios sin previo aviso.',
    bathTitle: 'Baño público',
    bathDescription: 'Baño público separado para hombres y mujeres 9F',
    operatingHours: 'Horario de funcionamiento:',
    bathHours: '15:00~Día siguiente 10:00',
    saunaNote: '(Solo sauna: 1:00~5:00 cerrado)',
    notice: 'Aviso',
    bathNotice1: '*Por favor traiga sus propias toallas y artículos de aseo desde su habitación.',
    bathNotice2: '*Se requiere un código de acceso para entrar al baño público de mujeres. El código se proporcionará en la recepción.',
    freeService: 'Servicio gratuito',
    bathServiceDesc: 'Ofrecemos gratuitamente bebidas lácteas y caramelos de hielo.',
    breakfastTitle: 'Desayuno (Restaurante 1F)',
    breakfastPrice: '/ ¥2,300',
    breakfastHours: '6:15~9:30 (Última entrada 9:00)',
    breakfastNote1: '*Es posible que se le pida que espere si el restaurante está lleno.',
    breakfastNote2: '*El horario puede cambiar según la congestión.',
    serviceTitle: 'Rincón de servicio',
    vendingMachine: 'Máquinas expendedoras (Alimentos congelados, bebidas, alcohol)',
    alcoholNote: '(Bebidas alcohólicas: 5F, 9F)',
    microwave: 'Microondas',
    iceMaker: 'Máquina de hielo (También disponible en el edificio anexo 3F)',
    smoking: 'Área de fumadores',
    trouserPress: 'Prensa de pantalones',
    trouserPressLocation: 'Frente al ascensor en cada piso',
    laundry: 'Lavandería de monedas',
    laundryNote: '*Detergente, lavadora/gratis, secadora/de pago (¥100 por 30 minutos)',
    wifiTitle: 'Wi-Fi',
    password: 'Contraseña:',
    wifiAccessPoint: 'Por favor, consulte la "Guía de Internet de la Habitación" instalada en su habitación para el punto de acceso.',
    copy: 'Copiar',
    wifiCopyNote: '※Puede copiar la contraseña tocando el botón',
    passwordCopied: '¡Contraseña copiada!',
    lostTitle: 'Objetos perdidos',
    lostText1: 'Como regla, el hotel no se pondrá en contacto con usted sobre objetos perdidos.',
    lostText2: 'Si no hay contacto, los objetos se eliminarán después de 3 meses de acuerdo con la Ley de Objetos Perdidos.',
    lostText3: 'Sin embargo, los alimentos y bebidas se eliminarán el mismo día.',
    lightingTitle: 'Iluminación interior',
    lightingDesc: 'Después de entrar en la habitación, inserte el portallaves de su habitación en el enchufe eléctrico junto a la entrada para encender la iluminación de la habitación.',
    lightingNote: '*Inserte la llave en el enchufe eléctrico.',
    longstayTitle: 'Para huéspedes de larga estancia',
    cleaningHours: 'Las horas de limpieza son de 11:00 a 15:00.',
    cleaningRequest: 'Si desea limpieza, por favor cuelgue la tarjeta Dondes \"Por favor limpie\" en el pomo exterior de la puerta antes de las 11:00.',
    sheetExchange: 'Los huéspedes que deseen cambiar las sábanas, fundas de futón y fundas de almohada, por favor muestren la \"Tarjeta WECO\" en la cama. No las cambiaremos si la tarjeta no se muestra. (Cambiaremos toallas y ropa de habitación.)',
    noCleaning: 'Los huéspedes que no necesiten limpieza, por favor muestren la tarjeta verde \"WECO\" en el lado del pasillo, que se encuentra en el interior de la puerta de entrada. En ese caso, no limpiaremos ni entraremos en la habitación.',
    parking: 'Información de aparcamientos asociados',
    parkingAllPrice: 'P1～P5: Todos 900 yenes por noche (Prolongación: 100 yenes por 30 minutos)',
    parkingMidExit: '※Se aplicarán cargos si sale durante la estancia.',
    parkingInquiry: '※Por favor consulte, ya que el estacionamiento puede estar lleno según la hora.',
    parkingP1Name: 'P1 Estacionamiento Hotel Ace',
    parkingP2Name: 'P2 Estacionamiento Ririka',
    parkingP3Name: 'P3 Mitsui Re-Park',
    parkingP4Name: 'P4 Estacionamiento MOSS',
    parkingP5Name: 'P5 Estacionamiento Cross Terrace',
    parkingUsageTime: '■Horas de uso:',
    parkingP1Time: '15:00～Al día siguiente 11:00',
    parkingP4Time: '16:00～Al día siguiente 11:00',
    parkingP5Time: '17:00～Al día siguiente 11:00',
    parkingExtension: '※Prolongación: 100 yenes por 30 minutos',
    parkingHeightLimit: '■Límite de altura:',
    parkingP2Height: 'Hasta 2.30m',
    parkingP4Height: 'Hasta 2.50m',
    parkingP5Height: 'Hasta 2.10m',
    parkingReservation: '■Reserva anticipada: No disponible',
    officialHP: 'Sitio web oficial',
    preparing: 'La información detallada se está preparando.',
    dinnerCouponLine1: 'Para la cena de esta noche',
    dinnerCouponLine2: 'Cupones de restaurante excelentes',
    amenitiesTitle: 'Común a todos los tipos de habitación',
    amenitiesNote: '※Los equipamientos están disponibles en el 1er piso.',
    amenityTowel: 'Toalla',
    amenityBathTowel: 'Toalla de baño',
    amenityDryer: 'Secador de pelo',
    amenityDeodorant: 'Spray desodorante',
    amenityShampoo: 'Champú',
    amenityConditioner: 'Acondicionador',
    amenityHandSoap: 'Jabón de manos',
    amenityToothbrush: 'Set de cepillado',
    amenityBodySoap: 'Jabón corporal',
    floor1F: '■ 1F',
    floor2F: '■ 2F',
    freeSpaceNote: '(El espacio libre no está disponible los 2os y 4os sábados de cada mes de 8:30 a 16:30 debido al evento Chuo-dori Machikado Marche)',
    freeSpace: 'Espacio libre (WiFi y Enchufes)',
    freeSpaceHours: 'Horas disponibles: 6:30～22:00',
    iwateSachiko: 'VTuber oficial de la prefectura de Iwate "Iwate Sachiko"',
    wrappingVending: 'Máquina expendedora envuelta (Primera unidad, envoltura de 4 lados)',
    souvenirVending1: 'Máquina expendedora local (Souvenirs de Iwate)',
    souvenirVending2: 'Máquina expendedora local (Souvenirs)',
    vendingMachineNote: 'Las máquinas expendedoras también están disponibles en el edificio anexo 3F y 6F',
    laundryHours: 'Horas disponibles: 10:00～22:00',
  },
  it: {
    hotelName: '',
    hotelTitle: 'Dormy Inn Sendai ANNEX',
    heroTitle: 'Guida dell\'hotel',
    welcomeMessage: 'Grazie mille per aver soggiornato con noi oggi.',
    welcomeMessage2: 'Se ha domande, non esiti a contattare il nostro personale della reception.',
    restaurantCoupon: 'Buono ristorante',
    checkInOut: 'Check-in/Check-out',
    bath: 'Bagno pubblico',
    breakfast: 'Colazione',
    dinner: 'Cena & Buoni',
    service: 'Angolo servizio',
    wifi: 'Wi-Fi',
    lighting: 'Illuminazione interna',
    longstay: 'Per ospiti soggiorno prolungato',
    lost: 'Oggetti smarriti',
    quickCheckin: 'Check-in rapido',
    dinnerTab: 'Cena & Buoni',
    serviceTab: 'Angolo servizio',
    close: 'Chiudi',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '*Gli orari possono variare a seconda del piano.',
    bbhMember: 'Membro BBH',
    earlyCheckin: 'Check-in anticipato',
    earlyCheckinFee: '1.000 yen all\'ora (fino alle 14:00)',
    lobbyDesc1: 'Una hall elegante con mobili antichi europei.',
    lobbyDesc2: 'Uno spazio tranquillo dove puoi dimenticare il trambusto della città.',
    lobbyDesc3: 'Puoi entrare in "Starbucks Coffee" direttamente dalla hall.',
    breakfastVenue: 'Luogo della colazione',
    breakfastFloor: '10° piano',
    breakfastTime: 'Orario',
    breakfastTimeDetail: '6:45～9:00 (ultimo ingresso 8:45)',
    breakfastDesc: 'Goditi un buffet per colazione nutriente con ingredienti locali.',
    breakfastNotice: 'Gli orari sono soggetti a modifiche senza preavviso.',
    bathTitle: 'Bagno pubblico',
    bathDescription: 'Bagno pubblico separato uomini/donne 9F',
    operatingHours: 'Orari di apertura:',
    bathHours: '15:00~Giorno successivo 10:00',
    saunaNote: '(Solo sauna: 1:00~5:00 chiuso)',
    notice: 'Avviso',
    bathNotice1: '*Si prega di portare i propri asciugamani e articoli da toilette dalla propria camera.',
    bathNotice2: '*È richiesto un codice di accesso per entrare nel bagno pubblico delle donne. Il codice verrà fornito alla reception.',
    freeService: 'Servizio gratuito',
    bathServiceDesc: 'Forniamo gratuitamente bevande lattiche e caramelle ghiacciate.',
    breakfastTitle: 'Colazione (Ristorante 1F)',
    breakfastPrice: '/ ¥2,300',
    breakfastHours: '6:15~9:30 (Ultimo ingresso 9:00)',
    breakfastNote1: '*Potrebbe essere richiesto di attendere se il ristorante è pieno.',
    breakfastNote2: '*Gli orari di apertura possono cambiare a seconda della congestione.',
    serviceTitle: 'Angolo servizio',
    vendingMachine: 'Distributori automatici (Cibi surgelati, bevande, alcol)',
    alcoholNote: '(Beveraggi alcolici: 5F, 9F)',
    microwave: 'Forno a microonde',
    iceMaker: 'Macchina del ghiaccio (Disponibile anche nell\'edificio annesso 3F)',
    smoking: 'Area fumatori',
    trouserPress: 'Stiratrice pantaloni',
    trouserPressLocation: 'Davanti all\'ascensore su ogni piano',
    laundry: 'Lavanderia a gettoni',
    laundryNote: '*Detergente, lavatrice/gratis, asciugatrice/a pagamento (¥100 per 30 minuti)',
    wifiTitle: 'Wi-Fi',
    password: 'Password:',
    wifiAccessPoint: 'Si prega di controllare la "Guida Internet della Camera" installata nella vostra camera per il punto di accesso.',
    copy: 'Copia',
    wifiCopyNote: '※È possibile copiare la password toccando il pulsante',
    passwordCopied: 'Password copiata!',
    lostTitle: 'Oggetti smarriti',
    lostText1: 'Di norma, l\'hotel non vi contatterà riguardo agli oggetti smarriti.',
    lostText2: 'Se non c\'è contatto, gli oggetti verranno eliminati dopo 3 mesi secondo la Legge sugli Oggetti Smarriti.',
    lostText3: 'Tuttavia, cibi e bevande verranno eliminati lo stesso giorno.',
    lightingTitle: 'Illuminazione interna',
    lightingDesc: 'Dopo essere entrati nella camera, inserire il portachiavi della camera nella presa elettrica accanto all\'ingresso per accendere l\'illuminazione della camera.',
    lightingNote: '*Inserire la chiave nella presa elettrica.',
    longstayTitle: 'Per ospiti soggiorno prolungato',
    cleaningHours: 'Le ore di pulizia sono dalle 11:00 alle 15:00.',
    cleaningRequest: 'Se desiderate la pulizia, si prega di appendere la carta Dondes \"Si prega di pulire\" sulla maniglia esterna della porta entro le 11:00.',
    sheetExchange: 'Gli ospiti che desiderano cambiare lenzuola, coperture futon e federe, si prega di mostrare la \"Carta WECO\" sul letto. Non le cambieremo se la carta non viene mostrata. (Cambieremo asciugamani e abbigliamento da camera.)',
    noCleaning: 'Gli ospiti che non necessitano di pulizia, si prega di mostrare la carta verde \"WECO\" sul lato del corridoio, che si trova all\'interno della porta d\'ingresso. In tal caso, non puliremo né entreremo nella camera.',
    parking: 'Informazioni sui parcheggi partner',
    parkingAllPrice: 'P1～P5: Tutti 900 yen a notte (Prolungamento: 100 yen per 30 minuti)',
    parkingMidExit: '※Verranno applicate tariffe se uscite durante il soggiorno.',
    parkingInquiry: '※Si prega di informarsi, in quanto il parcheggio può essere pieno a seconda dell\'ora.',
    parkingP1Name: 'P1 Parcheggio Hotel Ace',
    parkingP2Name: 'P2 Parcheggio Ririka',
    parkingP3Name: 'P3 Mitsui Re-Park',
    parkingP4Name: 'P4 Parcheggio MOSS',
    parkingP5Name: 'P5 Parcheggio Cross Terrace',
    parkingUsageTime: '■Orari di utilizzo:',
    parkingP1Time: '15:00～Il giorno successivo 11:00',
    parkingP4Time: '16:00～Il giorno successivo 11:00',
    parkingP5Time: '17:00～Il giorno successivo 11:00',
    parkingExtension: '※Prolungamento: 100 yen per 30 minuti',
    parkingHeightLimit: '■Limite di altezza:',
    parkingP2Height: 'Fino a 2.30m',
    parkingP4Height: 'Fino a 2.50m',
    parkingP5Height: 'Fino a 2.10m',
    parkingReservation: '■Prenotazione anticipata: Non disponibile',
    officialHP: 'Sito web ufficiale',
    preparing: 'Le informazioni dettagliate sono in preparazione.',
    dinnerCouponLine1: 'Per la cena di stasera',
    dinnerCouponLine2: 'Ottimi coupon ristorante',
    amenitiesTitle: 'Comune a tutti i tipi di camera',
    amenitiesNote: '※Le attrezzature sono disponibili al 1° piano.',
    amenityTowel: 'Asciugamano',
    amenityBathTowel: 'Asciugamano da bagno',
    amenityDryer: 'Asciugacapelli',
    amenityDeodorant: 'Spray deodorante',
    amenityShampoo: 'Shampoo',
    amenityConditioner: 'Balsamo',
    amenityHandSoap: 'Sapone per le mani',
    amenityToothbrush: 'Set spazzolino',
    amenityBodySoap: 'Sapone per il corpo',
    floor1F: '■ 1F',
    floor2F: '■ 2F',
    freeSpaceNote: '(Lo spazio libero non è disponibile il 2° e 4° sabato di ogni mese dalle 8:30 alle 16:30 a causa dell\'evento Chuo-dori Machikado Marche)',
    freeSpace: 'Spazio libero (WiFi e Prese)',
    freeSpaceHours: 'Ore disponibili: 6:30～22:00',
    iwateSachiko: 'VTuber ufficiale della prefettura di Iwate "Iwate Sachiko"',
    wrappingVending: 'Distributore automatico avvolto (Prima unità, confezione a 4 lati)',
    souvenirVending1: 'Distributore automatico locale (Souvenir di Iwate)',
    souvenirVending2: 'Distributore automatico locale (Souvenir)',
    vendingMachineNote: 'I distributori automatici sono disponibili anche nell\'edificio annesso 3F e 6F',
    laundryHours: 'Ore disponibili: 10:00～22:00',
  },
  th: {
    hotelName: '',
    hotelTitle: 'โรงแรมแกรนด์เทอเรส เซนได โคคุบุนโช',
    heroTitle: 'คู่มือภายในโรงแรม',
    welcomeMessage: 'ขอขอบคุณที่เข้าพักที่ "โรงแรมแกรนด์เทอเรส เซนได โคคุบุนโช" ในวันนี้',
    welcomeMessage2: 'หากมีข้อสงสัย กรุณาสอบถามพนักงานแผนกต้อนรับได้ตลอดเวลา',
    restaurantCoupon: 'คูปองร้านอาหาร',
    checkInOut: 'เวลาเช็คอิน/เช็คเอาท์',
    bath: 'ล็อบบี้・สิ่งอำนวยความสะดวก',
    breakfast: 'อาหารเช้า',
    dinner: 'อาหารเย็น・คูปองส่วนลด',
    service: 'มุมบริการ',
    wifi: 'Wi-Fi',
    lighting: 'แสงสวางในห้อง',
    longstay: 'สำหรับแขกพักหลายคืน',
    lost: 'ของหายที่พบ',
    quickCheckin: 'เช็คอินด่วน',
    dinnerTab: 'อาหารเย็น・คูปองส่วนลด',
    serviceTab: 'มุมบริการ',
    close: 'ปิด',
    checkIn: 'เช็คอิน',
    checkOut: 'เช็คเอาท์',
    planNote: '※เวลาอาจแตกต่างกันไปตามแผนที่จอง',
    bbhMember: 'สมาชิก BBH',
    earlyCheckin: 'เช็คอินเร็ว',
    earlyCheckinFee: '1,000 เยนต่อชั่วโมง (ถึง 14:00)',
    lobbyDesc1: 'ล็อบบี้ที่หรูหราพร้อมเฟอร์นิเจอร์โบราณยุโรป',
    lobbyDesc2: 'พื้นที่สงบที่ทำให้คุณลืมความวุ่นวายของเมือง',
    lobbyDesc3: 'คุณสามารถเข้า "สตาร์บัคส์ คอฟฟี่" ได้โดยตรงจากล็อบบี้',
    breakfastVenue: 'สถานที่อาหารเช้า',
    breakfastFloor: 'ชั้น 10',
    breakfastTime: 'เวลาทำการ',
    breakfastTimeDetail: '6:45～9:00 (เข้าครั้งสุดท้าย 8:45)',
    breakfastDesc: 'เพลิดเพลินกับบุฟเฟ่ต์อาหารเช้าที่มีคุณค่าทางโภชนาการจากวัตถุดิบท้องถิ่น',
    breakfastNotice: 'เวลาทำการอาจเปลี่ยนแปลงโดยไม่แจ้งให้ทราบล่วงหน้า',
    bathTitle: 'ล็อบบี้・สิ่งอำนวยความสะดวก',
    bathDescription: 'ห้องอาบน้ำขนาดใหญ่แยกชายหญิง 9F',
    operatingHours: 'เวลาทำการ:',
    bathHours: '15:00~10:00 วันถัดไป',
    saunaNote: '(ซาวน่าเท่านั้น 1:00~5:00 หยุดให้บริการ)',
    notice: 'ข้อควรทราบ',
    bathNotice1: '※กรุณานำผ้าเช็ดตัวและอุปกรณ์อาบน้ำจากห้องของท่านเอง',
    bathNotice2: '※ต้องใช้รหัสผ่านในการเข้าห้องอาบน้ำสตรี รหัสผ่านจะมีให้ที่แผนกต้อนรับ',
    freeService: 'บริการฟรี',
    bathServiceDesc: 'เรามีบริการเครื่องดื่มแลคโตบาซิลลัสและไอศกรีมแท่งฟรี',
    breakfastTitle: 'อาหารเช้า (ร้านอาหาร 1F)',
    breakfastPrice: 'ผู้ใหญ่ 1,200 เยน (รวมภาษี) / เด็ก (นักเรียนประถม) 800 เยน (รวมภาษี)',
    breakfastHours: '6:15~9:30 (เข้าครั้งสุดท้าย 9:00)',
    breakfastNote1: '※อาจต้องรอคิวในกรณีที่เต็ม',
    breakfastNote2: '※เวลาทำการอาจเปลี่ยนแปลงตามสถานการณ์ความแออัด',
    serviceTitle: 'มุมบริการ',
    vendingMachine: 'ตู้กดสินค้า（อาหารแช่แข็ง・เครื่องดื่ม・แอลกอฮอล์）',
    alcoholNote: '(เครื่องดื่มแอลกอฮอล์อยู่ที่ 5・7・9F)',
    microwave: 'ไมโครเวฟ',
    iceMaker: 'เครื่องทำน้ำแข็ง（มีที่อาคารเสริม 3F ด้วย）',
    smoking: 'มุมสูบบุหรี่',
    trouserPress: 'เครื่องรีดกางเกง',
    trouserPressLocation: 'หน้าลิฟต์ทุกชั้น',
    laundry: 'ร้านซักผ้าเหรียญ',
    laundryNote: '※เครื่องซักผ้า/ครั้งละ 200 เยน เครื่องอบผ้า/10 นาที 100 เยน (ผงซักฟอกแจกฟรีที่แผนกต้อนรับ)',
    wifiTitle: 'Wi-Fi',
    password: 'รหัสผ่าน:',
    wifiAccessPoint: 'กรุณาตรวจสอบ "คู่มืออินเทอร์เน็ตห้องพัก" ที่ติดตั้งในห้องของคุณสำหรับจุดเชื่อมต่อ',
    copy: 'คัดลอก',
    wifiCopyNote: '※คุณสามารถคัดลอกรหัสผ่านโดยแตะที่ปุ่ม',
    passwordCopied: 'คัดลอกรหัสผ่านแล้ว!',
    lostTitle: 'ของหาย',
    lostText1: 'โดยหลักการแล้ว ทางโรงแรมจะไม่ติดต่อเกี่ยวกับของหาย',
    lostText2: 'หากไม่มีการติดต่อ จะดำเนินการตามกฎหมายของหายหลังจากผ่านไป 3 เดือน',
    lostText3: 'อย่างไรก็ตาม อาหารและเครื่องดื่มจะถูกทิ้งในวันเดียวกัน',
    lightingTitle: 'แสงสวางในห้อง',
    lightingDesc: 'หลังจากเข้าห้อง ให้เสียบพวงกุญแจห้องเข้าในเต้ารับไฟฟ้าข้างทางเข้า แสงสว่างในห้องจะเปิดขึ้น',
    lightingNote: '※เสียบกุญแจเข้าในเต้ารับไฟฟ้า',
    longstayTitle: 'สำหรับแขกพักหลายคืน',
    cleaningHours: 'เวลาทำความสะอาดคือ 11:00～15:00',
    cleaningRequest: 'หากต้องการทำความสะอาด กรุณาแขวนบัตร Dondes "กรุณาทำความสะอาด" ที่ลูกบิดประตูด้านนอกก่อน 11:00',
    sheetExchange: 'หากต้องการบริการทำความสะอาด กรุณาติดแม่เหล็กสีเขียว "กรุณาทำความสะอาด" ที่ด้านนอกประตูห้องทางด้านทางเดินก่อน 9:00 น. ของเช้าวันถัดไป',
    noCleaning: 'หากไม่ต้องการทำความสะอาด กรุณาติดแม่เหล็กสีน้ำเงิน "ห้ามรบกวน" ที่ด้านนอกประตูห้องทางด้านทางเดิน หากไม่มีการติดแม่เหล็ก เราจะไม่ทำความสะอาดและจะวางผ้าเช็ดตัวไว้หน้าประตูเท่านั้น จากมุมมองด้านสุขอนามัย การทำความสะอาดจะเป็นทุก 3 วัน (2 คืนแรกเปลี่ยนผ้าเช็ดตัวเท่านั้น คืนที่ 3 ทำความสะอาด คืนที่ 4 เป็นต้นไปวนซ้ำ)',
    parking: 'ข้อมูลที่จอดรถพันธมิตร',
    parkingAllPrice: 'P1～P5 ทั้งหมด 900 เยนต่อคืน（ต่อเวลา 30 นาที 100 เยน）',
    parkingMidExit: '※หากออกกลางคันจะมีการเรียกเก็บเงิน',
    parkingInquiry: '※กรุณาสอบถามเนื่องจากที่จอดรถอาจเต็มตามช่วงเวลา',
    parkingP1Name: 'P1 ที่จอดรถโรงแรมเอซ',
    parkingP2Name: 'P2 ที่จอดรถริริกะ',
    parkingP3Name: 'P3 มิตซูอิ รีพาร์ค',
    parkingP4Name: 'P4 ที่จอดรถ MOSS',
    parkingP5Name: 'P5 ที่จอดรถ Cross Terrace',
    parkingUsageTime: '■เวลาทำการ：',
    parkingP1Time: '15:00～วันถัดไป 11:00',
    parkingP4Time: '16:00～วันถัดไป 11:00',
    parkingP5Time: '17:00～วันถัดไป 11:00',
    parkingExtension: '※ต่อเวลา 30 นาที 100 เยน',
    parkingHeightLimit: '■จำกัดความสูง：',
    parkingP2Height: 'สูงสุด 2.30m',
    parkingP4Height: 'สูงสุด 2.50m',
    parkingP5Height: 'สูงสุด 2.10m',
    parkingReservation: '■จองล่วงหน้า：ไม่สามารถใช้ได้',
    officialHP: 'เว็บไซต์อย่างเป็นทางการ',
    preparing: 'ข้อมูลรายละเอียดกำลังเตรียมการ',
    dinnerCouponLine1: 'สำหรับอาหารเย็นคืนนี้',
    dinnerCouponLine2: 'คูปองร้านอาหารสุดคุ้ม',
    amenitiesTitle: 'ทั่วไปสำหรับทุกประเภทห้อง',
    amenitiesNote: '※สิ่งอำนวยความสะดวกมีให้บริการที่ชั้น 1F',
    amenityTowel: 'ผ้าเช็ดตัว',
    amenityBathTowel: 'ผ้าเช็ดตัวอาบน้ำ',
    amenityDryer: 'ไดร์เป่าผม',
    amenityDeodorant: 'สเปรย์ดับกลิ่น',
    amenityShampoo: 'แชมพู',
    amenityConditioner: 'ครีมนวดผม',
    amenityHandSoap: 'สบู่ล้างมือ',
    amenityToothbrush: 'ชุดแปรงฟัน',
    amenityBodySoap: 'สบู่อาบน้ำ',
    floor1F: '■ 1F',
    floor2F: '■ 2F',
    freeSpaceNote: '（ทุกวันเสาร์ที่ 2 และ 4 ของเดือน 8:30～16:30 เนื่องจากมีการจัดงาน Chuo-dori Machikado Marche พื้นที่ว่างจึงไม่สามารถใช้งานได้）',
    freeSpace: 'พื้นที่ว่าง（WiFi・ปลั๊กไฟ）',
    freeSpaceHours: 'เวลาทำการ 6:30～22:00',
    iwateSachiko: 'VTuber ทางการของจังหวัดอิวาเตะ「อิวาเตะ ซาจิโกะ」',
    wrappingVending: 'ตู้กดสินค้าห่อ（เครื่องแรก・ห่อ 4 ด้าน）',
    souvenirVending1: 'ตู้กดสินค้าท้องถิ่น（ของฝากอิวาเตะ）',
    souvenirVending2: 'ตู้กดสินค้าท้องถิ่น（ของฝาก）',
    vendingMachineNote: 'ตู้กดสินค้ามีที่อาคารเสริม 3F・6F ด้วย',
    laundryHours: 'เวลาทำการ 10:00～22:00',
  },
  vi: {
    hotelName: '',
    hotelTitle: 'Hotel Grand Terrace Sendai Kokubuncho',
    heroTitle: 'Hướng dẫn trong khách sạn',
    welcomeMessage: 'Cảm ơn quý khách đã sử dụng "Hotel Grand Terrace Sendai Kokubuncho" hôm nay.',
    welcomeMessage2: 'Nếu có bất kỳ thắc mắc nào, vui lòng hỏi nhân viên lễ tân.',
    restaurantCoupon: 'Phiếu giảm giá nhà hàng',
    checkInOut: 'Giờ nhận/trả phòng',
    bath: 'Sảnh・Cơ sở vật chất',
    breakfast: 'Bữa sáng',
    dinner: 'Bữa tối・Phiếu giảm giá',
    service: 'Khu vực dịch vụ',
    wifi: 'Wi-Fi',
    lighting: 'Đèn trong phòng',
    longstay: 'Dành cho khách lưu trú dài hạn',
    lost: 'Đồ thất lạc',
    quickCheckin: 'Nhận phòng nhanh',
    dinnerTab: 'Bữa tối・Phiếu giảm giá',
    serviceTab: 'Khu vực dịch vụ',
    close: 'Đóng',
    checkIn: 'Nhận phòng',
    checkOut: 'Trả phòng',
    planNote: '※Thời gian có thể khác nhau tùy theo gói.',
    bbhMember: 'Thành viên BBH',
    earlyCheckin: 'Nhận phòng sớm',
    earlyCheckinFee: '1.000 yên mỗi giờ (đến 14:00)',
    lobbyDesc1: 'Sảnh sang trọng với đồ nội thất cổ châu Âu.',
    lobbyDesc2: 'Một không gian yên tĩnh để bạn quên đi sự ồn ào của thành phố.',
    lobbyDesc3: 'Bạn có thể vào "Starbucks Coffee" trực tiếp từ sảnh.',
    breakfastVenue: 'Địa điểm bữa sáng',
    breakfastFloor: 'Tầng 10',
    breakfastTime: 'Giờ hoạt động',
    breakfastTimeDetail: '6:45～9:00 (vào cuối cùng 8:45)',
    breakfastDesc: 'Thưởng thức bữa sáng buffet bổ dưỡng với nguyên liệu địa phương.',
    breakfastNotice: 'Giờ hoạt động có thể thay đổi mà không cần thông báo trước.',
    bathTitle: 'Sảnh・Cơ sở vật chất',
    bathDescription: 'Bồn tắm lớn nam nữ riêng biệt 9F',
    operatingHours: 'Giờ mở cửa:',
    bathHours: '15:00~10:00 ngày hôm sau',
    saunaNote: '(Chỉ phòng xông hơi 1:00~5:00 đóng cửa)',
    notice: 'Lưu ý',
    bathNotice1: '※Vui lòng tự mang khăn và đồ dùng cá nhân từ phòng.',
    bathNotice2: '※Cần mật khẩu để vào bồn tắm nữ. Mật khẩu sẽ được cung cấp tại lễ tân.',
    freeService: 'Dịch vụ miễn phí',
    bathServiceDesc: 'Chúng tôi cung cấp miễn phí đồ uống lactic acid và kẹo que đá.',
    breakfastTitle: 'Bữa sáng (Nhà hàng 1F)',
    breakfastPrice: 'Người lớn 1,200 yên (đã bao gồm thuế) / Trẻ em (học sinh tiểu học) 800 yên (đã bao gồm thuế)',
    breakfastHours: '6:15~9:30 (Vào lần cuối 9:00)',
    breakfastNote1: '※Có thể phải chờ nếu đầy chỗ.',
    breakfastNote2: '※Giờ mở cửa có thể thay đổi tùy theo tình hình đông khách.',
    serviceTitle: 'Khu vực dịch vụ',
    vendingMachine: 'Máy bán hàng tự động（Thực phẩm đông lạnh・Đồ uống・Rượu）',
    alcoholNote: '(Đồ uống có cồn ở 5・7・9F)',
    microwave: 'Lò vi sóng',
    iceMaker: 'Máy làm đá（Cũng có ở tòa nhà phụ 3F）',
    smoking: 'Khu vực hút thuốc',
    trouserPress: 'Máy ủi quần',
    trouserPressLocation: 'Trước thang máy mỗi tầng',
    laundry: 'Tiệm giặt tự động',
    laundryNote: '※Máy giặt/1 lần 200 yên Máy sấy/10 phút 100 yên (Bột giặt phát miễn phí tại lễ tân)',
    wifiTitle: 'Wi-Fi',
    password: 'Mật khẩu:',
    wifiAccessPoint: 'Vui lòng kiểm tra "Hướng dẫn Internet phòng khách" được lắp đặt trong phòng của bạn để biết điểm truy cập.',
    copy: 'Sao chép',
    wifiCopyNote: '※Bạn có thể sao chép mật khẩu bằng cách nhấn vào nút',
    passwordCopied: 'Đã sao chép mật khẩu!',
    lostTitle: 'Đồ thất lạc',
    lostText1: 'Về nguyên tắc, khách sạn sẽ không liên lạc về đồ thất lạc.',
    lostText2: 'Nếu không có liên lạc, sẽ được xử lý sau 3 tháng theo luật đồ thất lạc.',
    lostText3: 'Tuy nhiên, thực phẩm và đồ uống sẽ được xử lý trong ngày.',
    lightingTitle: 'Đèn trong phòng',
    lightingDesc: 'Sau khi vào phòng, cắm móc khóa phòng vào ổ cắm điện bên cạnh lối vào để bật đèn trong phòng.',
    lightingNote: '※Cắm chìa khóa vào ổ cắm điện.',
    longstayTitle: 'Dành cho khách lưu trú dài hạn',
    cleaningHours: 'Giờ dọn phòng là từ 11:00 đến 15:00.',
    cleaningRequest: 'Nếu muốn dọn phòng, vui lòng treo thẻ Dondes "Vui lòng dọn phòng" trên tay nắm cửa bên ngoài trước 11:00.',
    sheetExchange: 'Nếu muốn dọn phòng, vui lòng dán nam châm màu xanh lá "Vui lòng dọn phòng" ở phía hành lang cửa ra vào trước 9 giờ sáng mai.',
    noCleaning: 'Nếu không cần dọn phòng, vui lòng dán nam châm màu xanh dương "Xin đừng làm phiền" ở phía hành lang cửa ra vào. Nếu không có nam châm, chúng tôi sẽ không dọn phòng và chỉ chuẩn bị khăn trước cửa. Vì lý do vệ sinh, việc dọn phòng sẽ là 3 ngày một lần (2 đêm đầu chỉ thay khăn, đêm thứ 3 dọn phòng, từ đêm thứ 4 trở đi lặp lại).',
    parking: 'Thông tin bãi đỗ xe đối tác',
    parkingAllPrice: 'P1～P5: Tất cả 900 yên mỗi đêm (Gia hạn: 100 yên mỗi 30 phút)',
    parkingMidExit: '※Sẽ tính phí nếu bạn xuất xe giữa chừng.',
    parkingInquiry: '※Vui lòng liên hệ vì bãi đỗ có thể đầy tùy theo thời gian.',
    parkingP1Name: 'P1 Bãi đỗ xe Hotel Ace',
    parkingP2Name: 'P2 Bãi đỗ xe Ririka',
    parkingP3Name: 'P3 Mitsui Re-Park',
    parkingP4Name: 'P4 Bãi đỗ xe MOSS',
    parkingP5Name: 'P5 Bãi đỗ xe Cross Terrace',
    parkingUsageTime: '■Giờ sử dụng:',
    parkingP1Time: '15:00～Ngày hôm sau 11:00',
    parkingP4Time: '16:00～Ngày hôm sau 11:00',
    parkingP5Time: '17:00～Ngày hôm sau 11:00',
    parkingExtension: '※Gia hạn: 100 yên mỗi 30 phút',
    parkingHeightLimit: '■Giới hạn chiều cao:',
    parkingP2Height: 'Lên đến 2.30m',
    parkingP4Height: 'Lên đến 2.50m',
    parkingP5Height: 'Lên đến 2.10m',
    parkingReservation: '■Đặt trước: Không có sẵn',
    officialHP: 'Trang web chính thức',
    preparing: 'Thông tin chi tiết đang được chuẩn bị.',
    dinnerCouponLine1: 'Cho bữa tối tối nay',
    dinnerCouponLine2: 'Phiếu giảm giá nhà hàng tuyệt vời',
    amenitiesTitle: 'Chung cho tất cả các loại phòng',
    amenitiesNote: '※Đồ dùng tiện nghi có sẵn ở tầng 1F',
    amenityTowel: 'Khăn tắm',
    amenityBathTowel: 'Khăn tắm lớn',
    amenityDryer: 'Máy sấy tóc',
    amenityDeodorant: 'Xịt khử mùi',
    amenityShampoo: 'Dầu gội',
    amenityConditioner: 'Dầu xả',
    amenityHandSoap: 'Xà phòng rửa tay',
    amenityToothbrush: 'Bộ đánh răng',
    amenityBodySoap: 'Xà phòng tắm',
    floor1F: '■ 1F',
    floor2F: '■ 2F',
    freeSpaceNote: '（Thứ 7 tuần thứ 2 và 4 hàng tháng 8:30～16:30 do sự kiện Chuo-dori Machikado Marche nên không gian tự do không thể sử dụng）',
    freeSpace: 'Không gian tự do（WiFi・Ổ cắm）',
    freeSpaceHours: 'Giờ sử dụng 6:30～22:00',
    iwateSachiko: 'VTuber chính thức của tỉnh Iwate「Iwate Sachiko」',
    wrappingVending: 'Máy bán hàng tự động có bọc（Máy đầu tiên・Bọc 4 mặt）',
    souvenirVending1: 'Máy bán hàng tự động địa phương（Đặc sản Iwate）',
    souvenirVending2: 'Máy bán hàng tự động địa phương（Đặc sản）',
    vendingMachineNote: 'Máy bán hàng tự động cũng có ở tòa nhà phụ 3F・6F',
    laundryHours: 'Giờ sử dụng 10:00～22:00',
  },
  id: {
    hotelName: '',
    hotelTitle: 'Hotel Grand Terrace Sendai Kokubuncho',
    heroTitle: 'Panduan dalam hotel',
    welcomeMessage: 'Terima kasih telah menginap di "Hotel Grand Terrace Sendai Kokubuncho" hari ini.',
    welcomeMessage2: 'Jika ada pertanyaan, silakan tanyakan kepada staf resepsionis kami.',
    restaurantCoupon: 'Kupon restoran',
    checkInOut: 'Waktu check-in/check-out',
    bath: 'Lobi・Fasilitas',
    breakfast: 'Sarapan',
    dinner: 'Makan malam・Kupon diskon',
    service: 'Sudut layanan',
    wifi: 'Wi-Fi',
    lighting: 'Lampu kamar',
    longstay: 'Untuk tamu menginap jangka panjang',
    lost: 'Barang hilang',
    quickCheckin: 'Check-in cepat',
    dinnerTab: 'Makan malam・Kupon diskon',
    serviceTab: 'Sudut layanan',
    close: 'Tutup',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '※Waktu mungkin berbeda tergantung pada paket.',
    bbhMember: 'Anggota BBH',
    earlyCheckin: 'Check-in awal',
    earlyCheckinFee: '1.000 yen per jam (sampai pukul 14:00)',
    lobbyDesc1: 'Lobi elegan dengan perabotan antik Eropa.',
    lobbyDesc2: 'Ruang tenang di mana Anda dapat melupakan hiruk pikuk kota.',
    lobbyDesc3: 'Anda dapat masuk ke "Starbucks Coffee" langsung dari lobi.',
    breakfastVenue: 'Tempat sarapan',
    breakfastFloor: 'Lantai 10',
    breakfastTime: 'Jam operasional',
    breakfastTimeDetail: '6:45～9:00 (masuk terakhir 8:45)',
    breakfastDesc: 'Nikmati buffet sarapan bergizi dengan bahan-bahan lokal.',
    breakfastNotice: 'Jam operasional dapat berubah tanpa pemberitahuan.',
    bathTitle: 'Lobi・Fasilitas',
    bathDescription: 'Pemandian umum terpisah pria dan wanita 9F',
    operatingHours: 'Jam operasional:',
    bathHours: '15:00~10:00 hari berikutnya',
    saunaNote: '(Hanya sauna 1:00~5:00 tutup)',
    notice: 'Pemberitahuan',
    bathNotice1: '※Silakan bawa handuk dan perlengkapan mandi Anda sendiri dari kamar.',
    bathNotice2: '※Kode sandi diperlukan untuk masuk ke pemandian wanita. Kode sandi akan diberikan di resepsionis.',
    freeService: 'Layanan gratis',
    bathServiceDesc: 'Kami menyediakan minuman asam laktat dan permen es gratis.',
    breakfastTitle: 'Sarapan (Restoran 1F)',
    breakfastPrice: 'Dewasa 1.200 yen (termasuk pajak) / Anak-anak (siswa SD) 800 yen (termasuk pajak)',
    breakfastHours: '6:15~9:30 (Masuk terakhir 9:00)',
    breakfastNote1: '※Anda mungkin diminta menunggu jika penuh.',
    breakfastNote2: '※Jam operasional dapat berubah tergantung pada kepadatan.',
    serviceTitle: 'Sudut layanan',
    vendingMachine: 'Mesin penjual otomatis（Makanan beku・Minuman・Alkohol）',
    alcoholNote: '(Minuman beralkohol di 5・7・9F)',
    microwave: 'Microwave',
    iceMaker: 'Mesin es（Juga tersedia di gedung tambahan 3F）',
    smoking: 'Area merokok',
    trouserPress: 'Setrika celana',
    trouserPressLocation: 'Di depan lift setiap lantai',
    laundry: 'Binatu koin',
    laundryNote: '※Mesin cuci/1 kali 200 yen Pengering/10 menit 100 yen (Deterjen gratis di resepsionis)',
    wifiTitle: 'Wi-Fi',
    password: 'Kata sandi:',
    wifiAccessPoint: 'Silakan periksa "Panduan Internet Kamar Tamu" yang terpasang di kamar Anda untuk titik akses.',
    copy: 'Salin',
    wifiCopyNote: '※Anda dapat menyalin kata sandi dengan mengetuk tombol',
    passwordCopied: 'Kata sandi disalin!',
    lostTitle: 'Barang hilang',
    lostText1: 'Sebagai aturan, hotel tidak akan menghubungi mengenai barang hilang.',
    lostText2: 'Jika tidak ada kontak, akan dibuang setelah 3 bulan sesuai dengan Undang-Undang Barang Hilang.',
    lostText3: 'Namun, makanan dan minuman akan dibuang pada hari yang sama.',
    lightingTitle: 'Lampu kamar',
    lightingDesc: 'Setelah memasuki kamar, masukkan gantungan kunci kamar ke soket listrik di samping pintu masuk untuk menyalakan lampu kamar.',
    lightingNote: '※Masukkan kunci ke soket listrik.',
    longstayTitle: 'Untuk tamu menginap jangka panjang',
    cleaningHours: 'Jam pembersihan adalah dari 11:00 hingga 15:00.',
    cleaningRequest: 'Jika ingin pembersihan, silakan gantungkan kartu Dondes "Silakan bersihkan" pada gagang pintu luar sebelum jam 11:00.',
    sheetExchange: 'Jika ingin pembersihan, silakan tempel magnet hijau "Silakan bersihkan" di sisi koridor pintu masuk sebelum jam 9 pagi besok.',
    noCleaning: 'Jika tidak perlu pembersihan, silakan tempel magnet biru "Jangan ganggu" di sisi koridor pintu masuk. Jika tidak ada magnet, kami tidak akan membersihkan dan hanya menyiapkan handuk di depan pintu. Dari sudut pandang kebersihan, pembersihan dilakukan 3 hari sekali (2 malam pertama hanya ganti handuk, malam ke-3 pembersihan, malam ke-4 dan seterusnya berulang).',
    parking: 'Informasi parkir mitra',
    parkingAllPrice: 'P1～P5: Semua 900 yen per malam (Perpanjangan: 100 yen per 30 menit)',
    parkingMidExit: '※Biaya akan dikenakan jika Anda keluar di tengah-tengah menginap.',
    parkingInquiry: '※Silakan tanyakan karena parkir mungkin penuh tergantung waktu.',
    parkingP1Name: 'P1 Parkir Hotel Ace',
    parkingP2Name: 'P2 Parkir Ririka',
    parkingP3Name: 'P3 Mitsui Re-Park',
    parkingP4Name: 'P4 Parkir MOSS',
    parkingP5Name: 'P5 Parkir Cross Terrace',
    parkingUsageTime: '■Jam penggunaan:',
    parkingP1Time: '15:00～Hari berikutnya 11:00',
    parkingP4Time: '16:00～Hari berikutnya 11:00',
    parkingP5Time: '17:00～Hari berikutnya 11:00',
    parkingExtension: '※Perpanjangan: 100 yen per 30 menit',
    parkingHeightLimit: '■Batas tinggi:',
    parkingP2Height: 'Hingga 2.30m',
    parkingP4Height: 'Hingga 2.50m',
    parkingP5Height: 'Hingga 2.10m',
    parkingReservation: '■Pemesanan di muka: Tidak tersedia',
    officialHP: 'Situs web resmi',
    preparing: 'Informasi detail sedang disiapkan.',
    dinnerCouponLine1: 'Untuk makan malam malam ini',
    dinnerCouponLine2: 'Kupon restoran hebat',
    amenitiesTitle: 'Umum untuk semua tipe kamar',
    amenitiesNote: '※Perlengkapan tersedia di lantai 1F',
    amenityTowel: 'Handuk',
    amenityBathTowel: 'Handuk mandi',
    amenityDryer: 'Pengering rambut',
    amenityDeodorant: 'Semprotan penghilang bau',
    amenityShampoo: 'Sampo',
    amenityConditioner: 'Kondisioner',
    amenityHandSoap: 'Sabun cuci tangan',
    amenityToothbrush: 'Set sikat gigi',
    amenityBodySoap: 'Sabun badan',
    floor1F: '■ 1F',
    floor2F: '■ 2F',
    freeSpaceNote: '（Setiap Sabtu ke-2 dan ke-4 setiap bulan 8:30～16:30 karena acara Chuo-dori Machikado Marche, ruang bebas tidak dapat digunakan）',
    freeSpace: 'Ruang bebas（WiFi・Stopkontak）',
    freeSpaceHours: 'Jam tersedia: 6:30～22:00',
    iwateSachiko: 'VTuber resmi Prefektur Iwate「Iwate Sachiko」',
    wrappingVending: 'Mesin penjual otomatis berlapis（Unit pertama・Lapisan 4 sisi）',
    souvenirVending1: 'Mesin penjual otomatis lokal（Oleh-oleh Iwate）',
    souvenirVending2: 'Mesin penjual otomatis lokal（Oleh-oleh）',
    vendingMachineNote: 'Mesin penjual otomatis juga tersedia di gedung tambahan 3F dan 6F',
    laundryHours: 'Jam tersedia: 10:00～22:00',
  },
  tl: {
    hotelName: '',
    hotelTitle: 'Hotel Grand Terrace Sendai Kokubuncho',
    heroTitle: 'Gabay sa hotel',
    welcomeMessage: 'Maraming salamat sa pag-stay sa "Hotel Grand Terrace Sendai Kokubuncho" ngayong araw.',
    welcomeMessage2: 'Kung mayroon kayong mga tanong, mangyaring magtanong sa aming staff sa front desk.',
    restaurantCoupon: 'Coupon ng restaurant',
    checkInOut: 'Oras ng check-in/check-out',
    bath: 'Lobby・Pasilidad',
    breakfast: 'Almusal',
    dinner: 'Hapunan・Coupon discount',
    service: 'Sulok ng serbisyo',
    wifi: 'Wi-Fi',
    lighting: 'Ilaw sa kwarto',
    longstay: 'Para sa mga long-term guests',
    lost: 'Nawawalang gamit',
    quickCheckin: 'Mabilis na check-in',
    dinnerTab: 'Hapunan・Coupon discount',
    serviceTab: 'Sulok ng serbisyo',
    close: 'Isara',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '※Ang oras ay maaaring mag-iba depende sa plan.',
    bbhMember: 'Miyembro ng BBH',
    earlyCheckin: 'Maagang check-in',
    earlyCheckinFee: '1,000 yen bawat oras (hanggang 14:00)',
    lobbyDesc1: 'Eleganteng lobby na may European antique furniture.',
    lobbyDesc2: 'Tahimik na espasyo kung saan makakalimutan mo ang ingay ng lungsod.',
    lobbyDesc3: 'Maaari kang pumasok sa "Starbucks Coffee" direkta mula sa lobby.',
    breakfastVenue: 'Lugar ng almusal',
    breakfastFloor: 'Ika-10 palapag',
    breakfastTime: 'Oras ng operasyon',
    breakfastTimeDetail: '6:45～9:00 (huling pasok 8:45)',
    breakfastDesc: 'Tangkilikin ang masustansyang almusal buffet na may lokal na sangkap.',
    breakfastNotice: 'Ang oras ng operasyon ay maaaring magbago nang walang paunawa.',
    bathTitle: 'Lobby・Pasilidad',
    bathDescription: 'Hiwalay na malaking banyo para sa lalaki at babae 9F',
    operatingHours: 'Oras ng operasyon:',
    bathHours: '15:00~10:00 kinabukasan',
    saunaNote: '(Sauna lamang 1:00~5:00 sarado)',
    notice: 'Paalala',
    bathNotice1: '※Mangyaring magdala ng sariling tuwalya at amenities mula sa kwarto.',
    bathNotice2: '※Kailangan ng password para makapasok sa banyo ng babae. Ang password ay ibibigay sa front desk.',
    freeService: 'Libreng serbisyo',
    bathServiceDesc: 'Nagbibigay kami ng libreng lactic acid drinks at ice candy.',
    breakfastTitle: 'Almusal (Restaurant 1F)',
    breakfastPrice: 'Matanda 1,200 yen (kasama ang tax) / Bata (elementary student) 800 yen (kasama ang tax)',
    breakfastHours: '6:15~9:30 (Huling pagpasok 9:00)',
    breakfastNote1: '※Maaaring kailangan maghintay kung puno.',
    breakfastNote2: '※Ang oras ng operasyon ay maaaring magbago depende sa siksikan.',
    serviceTitle: 'Sulok ng serbisyo',
    vendingMachine: 'Vending machines（Frozen food・Drinks・Alcohol）',
    alcoholNote: '(Alcoholic drinks sa 5・7・9F)',
    microwave: 'Microwave',
    iceMaker: 'Ice maker（Available din sa annex building 3F）',
    smoking: 'Smoking area',
    trouserPress: 'Trouser press',
    trouserPressLocation: 'Sa harap ng elevator sa bawat palapag',
    laundry: 'Coin laundry',
    laundryNote: '※Washing machine/1 beses 200 yen Dryer/10 minuto 100 yen (Detergent libreng kuha sa front desk)',
    wifiTitle: 'Wi-Fi',
    password: 'Password:',
    wifiAccessPoint: 'Mangyaring suriin ang "Guest Room Internet Guide" na naka-install sa inyong kwarto para sa access point.',
    copy: 'Kopyahin',
    wifiCopyNote: '※Maaari mong kopyahin ang password sa pamamagitan ng pag-tap sa button',
    passwordCopied: 'Nakopya na ang password!',
    lostTitle: 'Nawawalang gamit',
    lostText1: 'Bilang patakaran, ang hotel ay hindi makikipag-ugnayan tungkol sa nawawalang gamit.',
    lostText2: 'Kung walang contact, itatapon pagkatapos ng 3 buwan ayon sa Lost Property Act.',
    lostText3: 'Gayunpaman, ang pagkain at inumin ay itatapon sa parehong araw.',
    lightingTitle: 'Ilaw sa kwarto',
    lightingDesc: 'Pagkatapos pumasok sa kwarto, ilagay ang key holder ng kwarto sa power socket sa tabi ng entrance para mag-on ang ilaw sa kwarto.',
    lightingNote: '※Ilagay ang susi sa power socket.',
    longstayTitle: 'Para sa mga long-term guests',
    cleaningHours: 'Ang oras ng paglilinis ay mula 11:00 hanggang 15:00.',
    cleaningRequest: 'Kung nais ng paglilinis, mangyaring isabit ang Dondes card na "Mangyaring linisin" sa panlabas na doorknob bago mag-11:00.',
    sheetExchange: 'Kung nais ng linis, mangyaring idikit ang berdeng magnet na "Mangyaring linisin" sa gilid ng hallway ng entrance door bago mag-9:00 ng umaga bukas.',
    noCleaning: 'Kung hindi kailangan ng linis, mangyaring idikit ang asul na magnet na "Huwag guluhin" sa gilid ng hallway ng entrance door. Kung walang magnet, hindi kami maglilinis at maghahanda lang ng tuwalya sa harap ng pinto. Para sa kalinisan, ang linis ay bawat 3 araw (2 unang gabi ay palit ng tuwalya lang, 3rd gabi ay linis, 4th gabi pataas ay ulitin).',
    parking: 'Impormasyon sa partner parking',
    parkingAllPrice: 'P1～P5: Lahat 900 yen bawat gabi (Extension: 100 yen bawat 30 minuto)',
    parkingMidExit: '※Magkakaroon ng bayad kung lalabas ka sa gitna ng stay.',
    parkingInquiry: '※Mangyaring magtanong dahil maaaring puno ang parking depende sa oras.',
    parkingP1Name: 'P1 Hotel Ace Parking',
    parkingP2Name: 'P2 Ririka Parking',
    parkingP3Name: 'P3 Mitsui Re-Park',
    parkingP4Name: 'P4 MOSS Parking',
    parkingP5Name: 'P5 Cross Terrace Parking',
    parkingUsageTime: '■Oras ng paggamit:',
    parkingP1Time: '15:00～Susunod na araw 11:00',
    parkingP4Time: '16:00～Susunod na araw 11:00',
    parkingP5Time: '17:00～Susunod na araw 11:00',
    parkingExtension: '※Extension: 100 yen bawat 30 minuto',
    parkingHeightLimit: '■Limitasyon sa taas:',
    parkingP2Height: 'Hanggang 2.30m',
    parkingP4Height: 'Hanggang 2.50m',
    parkingP5Height: 'Hanggang 2.10m',
    parkingReservation: '■Advance reservation: Hindi available',
    officialHP: 'Official website',
    preparing: 'Ang detalyadong impormasyon ay inihahanda.',
    dinnerCouponLine1: 'Para sa hapunan ngayong gabi',
    dinnerCouponLine2: 'Mahusay na restaurant coupons',
    amenitiesTitle: 'Karaniwan sa lahat ng uri ng kwarto',
    amenitiesNote: '※Ang mga kagamitan ay available sa 1F floor.',
    amenityTowel: 'Tuwalya',
    amenityBathTowel: 'Tuwalya sa paliguan',
    amenityDryer: 'Hair dryer',
    amenityDeodorant: 'Deodorant spray',
    amenityShampoo: 'Shampoo',
    amenityConditioner: 'Conditioner',
    amenityHandSoap: 'Hand soap',
    amenityToothbrush: 'Toothbrush set',
    amenityBodySoap: 'Body soap',
    floor1F: '■ 1F',
    floor2F: '■ 2F',
    freeSpaceNote: '（Tuwing 2nd at 4th na Sabado ng bawat buwan 8:30～16:30 dahil sa Chuo-dori Machikado Marche event, ang libreng espasyo ay hindi available）',
    freeSpace: 'Libreng espasyo（WiFi・Outlet）',
    freeSpaceHours: 'Available na oras: 6:30～22:00',
    iwateSachiko: 'Opisyal na VTuber ng Prefecture ng Iwate「Iwate Sachiko」',
    wrappingVending: 'Wrapped vending machine（Unang unit・4-sided wrap）',
    souvenirVending1: 'Lokal na vending machine（Iwate souvenirs）',
    souvenirVending2: 'Lokal na vending machine（Souvenirs）',
    vendingMachineNote: 'Ang vending machines ay available din sa annex building 3F at 6F',
    laundryHours: 'Available na oras: 10:00～22:00',
  },
  ms: {
    hotelName: '',
    hotelTitle: 'Hotel Grand Terrace Sendai Kokubuncho',
    heroTitle: 'Panduan hotel',
    welcomeMessage: 'Terima kasih kerana menginap di "Hotel Grand Terrace Sendai Kokubuncho" hari ini.',
    welcomeMessage2: 'Jika ada sebarang pertanyaan, sila tanya kakitangan kaunter depan kami.',
    restaurantCoupon: 'Kupon restoran',
    checkInOut: 'Masa daftar masuk/keluar',
    bath: 'Lobi・Kemudahan',
    breakfast: 'Sarapan',
    dinner: 'Makan malam・Kupon diskaun',
    service: 'Sudut perkhidmatan',
    wifi: 'Wi-Fi',
    lighting: 'Lampu bilik',
    longstay: 'Untuk tetamu jangka panjang',
    lost: 'Barang hilang',
    quickCheckin: 'Daftar masuk pantas',
    dinnerTab: 'Makan malam・Kupon diskaun',
    serviceTab: 'Sudut perkhidmatan',
    close: 'Tutup',
    checkIn: 'Daftar masuk',
    checkOut: 'Daftar keluar',
    planNote: '※Masa mungkin berbeza bergantung pada pelan.',
    bbhMember: 'Ahli BBH',
    earlyCheckin: 'Daftar masuk awal',
    earlyCheckinFee: '1,000 yen sejam (sehingga 14:00)',
    lobbyDesc1: 'Lobi yang elegan dengan perabot antik Eropah.',
    lobbyDesc2: 'Ruang yang tenang di mana anda boleh melupakan kesibukan bandar.',
    lobbyDesc3: 'Anda boleh masuk ke "Starbucks Coffee" terus dari lobi.',
    breakfastVenue: 'Tempat sarapan',
    breakfastFloor: 'Tingkat 10',
    breakfastTime: 'Waktu operasi',
    breakfastTimeDetail: '6:45～9:00 (kemasukan terakhir 8:45)',
    breakfastDesc: 'Nikmati bufet sarapan yang berkhasiat dengan bahan-bahan tempatan.',
    breakfastNotice: 'Waktu operasi tertakluk kepada perubahan tanpa notis.',
    bathTitle: 'Lobi・Kemudahan',
    bathDescription: 'Bilik mandi awam berasingan lelaki dan wanita 9F',
    operatingHours: 'Waktu operasi:',
    bathHours: '15:00~10:00 hari berikutnya',
    saunaNote: '(Hanya sauna 1:00~5:00 tutup)',
    notice: 'Notis',
    bathNotice1: '※Sila bawa tuala dan kemudahan sendiri dari bilik.',
    bathNotice2: '※Kata laluan diperlukan untuk masuk ke bilik mandi wanita. Kata laluan akan diberikan di kaunter depan.',
    freeService: 'Perkhidmatan percuma',
    bathServiceDesc: 'Kami menyediakan minuman asid laktik dan gula-gula ais percuma.',
    breakfastTitle: 'Sarapan (Restoran 1F)',
    breakfastPrice: 'Dewasa 1,200 yen (termasuk cukai) / Kanak-kanak (pelajar rendah) 800 yen (termasuk cukai)',
    breakfastHours: '6:15~9:30 (Kemasukan terakhir 9:00)',
    breakfastNote1: '※Mungkin perlu menunggu jika penuh.',
    breakfastNote2: '※Waktu operasi mungkin berubah bergantung pada kesesakan.',
    serviceTitle: 'Sudut perkhidmatan',
    vendingMachine: 'Mesin layan diri（Makanan sejuk beku・Minuman・Alkohol）',
    alcoholNote: '(Minuman beralkohol di 5・7・9F)',
    microwave: 'Ketuhar gelombang mikro',
    iceMaker: 'Pembuat ais（Juga tersedia di bangunan tambahan 3F）',
    smoking: 'Kawasan merokok',
    trouserPress: 'Seterika seluar',
    trouserPressLocation: 'Di hadapan lif setiap tingkat',
    laundry: 'Dobi syiling',
    laundryNote: '※Mesin basuh/1 kali 200 yen Pengering/10 minit 100 yen (Detergen percuma di kaunter depan)',
    wifiTitle: 'Wi-Fi',
    password: 'Kata laluan:',
    wifiAccessPoint: 'Sila semak "Panduan Internet Bilik Tetamu" yang dipasang di bilik anda untuk titik akses.',
    copy: 'Salin',
    wifiCopyNote: '※Anda boleh menyalin kata laluan dengan menekan butang',
    passwordCopied: 'Kata laluan disalin!',
    lostTitle: 'Barang hilang',
    lostText1: 'Sebagai peraturan, hotel tidak akan menghubungi mengenai barang hilang.',
    lostText2: 'Jika tiada hubungan, akan dilupuskan selepas 3 bulan mengikut Akta Harta Hilang.',
    lostText3: 'Walau bagaimanapun, makanan dan minuman akan dilupuskan pada hari yang sama.',
    lightingTitle: 'Lampu bilik',
    lightingDesc: 'Selepas memasuki bilik, masukkan pemegang kunci bilik ke dalam soket kuasa di sebelah pintu masuk untuk menghidupkan lampu bilik.',
    lightingNote: '※Masukkan kunci ke dalam soket kuasa.',
    longstayTitle: 'Untuk tetamu jangka panjang',
    cleaningHours: 'Waktu pembersihan adalah dari 11:00 hingga 15:00.',
    cleaningRequest: 'Jika mahu pembersihan, sila gantungkan kad Dondes "Sila bersihkan" pada pemegang pintu luar sebelum jam 11:00.',
    sheetExchange: 'Jika mahu pembersihan, sila lekatkan magnet hijau "Sila bersihkan" di bahagian koridor pintu masuk sebelum jam 9 pagi esok.',
    noCleaning: 'Jika tidak perlukan pembersihan, sila lekatkan magnet biru "Jangan ganggu" di bahagian koridor pintu masuk. Jika tiada magnet, kami tidak akan membersihkan dan hanya menyediakan tuala di hadapan pintu. Dari segi kebersihan, pembersihan adalah setiap 3 hari (2 malam pertama hanya tukar tuala, malam ke-3 pembersihan, malam ke-4 dan seterusnya ulang).',
    parking: 'Maklumat tempat letak kereta rakan kongsi',
    parkingAllPrice: 'P1～P5: Semua 900 yen semalam (Sambungan: 100 yen setiap 30 minit)',
    parkingMidExit: '※Bayaran akan dikenakan jika anda keluar di tengah-tengah penginapan.',
    parkingInquiry: '※Sila tanya kerana tempat letak kereta mungkin penuh bergantung pada masa.',
    parkingP1Name: 'P1 Tempat Letak Kereta Hotel Ace',
    parkingP2Name: 'P2 Tempat Letak Kereta Ririka',
    parkingP3Name: 'P3 Mitsui Re-Park',
    parkingP4Name: 'P4 Tempat Letak Kereta MOSS',
    parkingP5Name: 'P5 Tempat Letak Kereta Cross Terrace',
    parkingUsageTime: '■Waktu penggunaan:',
    parkingP1Time: '15:00～Hari berikutnya 11:00',
    parkingP4Time: '16:00～Hari berikutnya 11:00',
    parkingP5Time: '17:00～Hari berikutnya 11:00',
    parkingExtension: '※Sambungan: 100 yen setiap 30 minit',
    parkingHeightLimit: '■Had ketinggian:',
    parkingP2Height: 'Sehingga 2.30m',
    parkingP4Height: 'Sehingga 2.50m',
    parkingP5Height: 'Sehingga 2.10m',
    parkingReservation: '■Tempahan awal: Tidak tersedia',
    officialHP: 'Laman web rasmi',
    preparing: 'Maklumat terperinci sedang disediakan.',
    dinnerCouponLine1: 'Untuk makan malam malam ini',
    dinnerCouponLine2: 'Kupon restoran hebat',
    amenitiesTitle: 'Biasa untuk semua jenis bilik',
    amenitiesNote: '※Kemudahan tersedia di tingkat 1F',
    amenityTowel: 'Tuala',
    amenityBathTowel: 'Tuala mandi',
    amenityDryer: 'Pengering rambut',
    amenityDeodorant: 'Semburan penghilang bau',
    amenityShampoo: 'Syampu',
    amenityConditioner: 'Perapi',
    amenityHandSoap: 'Sabun tangan',
    amenityToothbrush: 'Set berus gigi',
    amenityBodySoap: 'Sabun badan',
    floor1F: '■ 1F',
    floor2F: '■ 2F',
    freeSpaceNote: '（Setiap Sabtu ke-2 dan ke-4 setiap bulan 8:30～16:30 kerana acara Chuo-dori Machikado Marche, ruang bebas tidak tersedia）',
    freeSpace: 'Ruang bebas（WiFi・Soket）',
    freeSpaceHours: 'Waktu tersedia: 6:30～22:00',
    iwateSachiko: 'VTuber rasmi Wilayah Iwate「Iwate Sachiko」',
    wrappingVending: 'Mesin layan diri berbalut（Unit pertama・Balutan 4 sisi）',
    souvenirVending1: 'Mesin layan diri tempatan（Cenderamata Iwate）',
    souvenirVending2: 'Mesin layan diri tempatan（Cenderamata）',
    vendingMachineNote: 'Mesin layan diri juga tersedia di bangunan tambahan 3F dan 6F',
    laundryHours: 'Waktu tersedia: 10:00～22:00',
  },
  pt: {
    hotelName: '',
    hotelTitle: 'Hotel Grand Terrace Sendai Kokubuncho',
    heroTitle: 'Guia do hotel',
    welcomeMessage: 'Muito obrigado por se hospedar no "Hotel Grand Terrace Sendai Kokubuncho" hoje.',
    welcomeMessage2: 'Se tiver alguma dúvida, por favor pergunte aos funcionários da recepção.',
    restaurantCoupon: 'Cupom de restaurante',
    checkInOut: 'Horário de check-in/check-out',
    bath: 'Lobby・Instalações',
    breakfast: 'Café da manhã',
    dinner: 'Jantar・Cupom de desconto',
    service: 'Canto de serviço',
    wifi: 'Wi-Fi',
    lighting: 'Iluminação do quarto',
    longstay: 'Para hóspedes de longa estadia',
    lost: 'Objetos perdidos',
    quickCheckin: 'Check-in rápido',
    dinnerTab: 'Jantar・Cupom de desconto',
    serviceTab: 'Canto de serviço',
    close: 'Fechar',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '※O horário pode variar dependendo do plano.',
    bbhMember: 'Membro BBH',
    earlyCheckin: 'Check-in antecipado',
    earlyCheckinFee: '1.000 ienes por hora (até às 14:00)',
    lobbyDesc1: 'Um lobby elegante com móveis antigos europeus.',
    lobbyDesc2: 'Um espaço calmo onde você pode esquecer a agitação da cidade.',
    lobbyDesc3: 'Você pode entrar no "Starbucks Coffee" diretamente do lobby.',
    breakfastVenue: 'Local do café da manhã',
    breakfastFloor: '10º andar',
    breakfastTime: 'Horário de funcionamento',
    breakfastTimeDetail: '6:45～9:00 (última entrada 8:45)',
    breakfastDesc: 'Desfrute de um buffet de café da manhã nutritivo com ingredientes locais.',
    breakfastNotice: 'O horário de funcionamento está sujeito a alterações sem aviso prévio.',
    bathTitle: 'Lobby・Instalações',
    bathDescription: 'Banho público separado para homens e mulheres 9F',
    operatingHours: 'Horário de funcionamento:',
    bathHours: '15:00~10:00 do dia seguinte',
    saunaNote: '(Apenas sauna 1:00~5:00 fechada)',
    notice: 'Aviso',
    bathNotice1: '※Por favor, traga suas próprias toalhas e amenidades do quarto.',
    bathNotice2: '※É necessária uma senha para entrar no banho público feminino. A senha será fornecida na recepção.',
    freeService: 'Serviço gratuito',
    bathServiceDesc: 'Oferecemos gratuitamente bebidas de ácido lático e picolés.',
    breakfastTitle: 'Café da manhã (Restaurante 1F)',
    breakfastPrice: 'Adulto 1.200 ienes (com impostos) / Criança (aluno do ensino fundamental) 800 ienes (com impostos)',
    breakfastHours: '6:15~9:30 (Última entrada 9:00)',
    breakfastNote1: '※Pode ser necessário esperar se estiver lotado.',
    breakfastNote2: '※O horário de funcionamento pode mudar dependendo da lotação.',
    serviceTitle: 'Canto de serviço',
    vendingMachine: 'Máquinas de venda automática (Alimentos congelados, bebidas, álcool)',
    alcoholNote: '(Bebidas alcoólicas em 5・7・9F)',
    microwave: 'Micro-ondas',
    iceMaker: 'Máquina de gelo (Também disponível no edifício anexo 3F)',
    smoking: 'Área de fumantes',
    trouserPress: 'Prensa de calças',
    trouserPressLocation: 'Em frente ao elevador em cada andar',
    laundry: 'Lavanderia de moedas',
    laundryNote: '※Máquina de lavar/1 vez 200 ienes Secadora/10 minutos 100 ienes (Detergente grátis na recepção)',
    wifiTitle: 'Wi-Fi',
    password: 'Senha:',
    wifiAccessPoint: 'Por favor, verifique o "Guia de Internet do Quarto" instalado no seu quarto para o ponto de acesso.',
    copy: 'Copiar',
    wifiCopyNote: '※Você pode copiar a senha tocando no botão',
    passwordCopied: 'Senha copiada!',
    lostTitle: 'Objetos perdidos',
    lostText1: 'Como regra, o hotel não entrará em contato sobre objetos perdidos.',
    lostText2: 'Se não houver contato, será descartado após 3 meses de acordo com a Lei de Objetos Perdidos.',
    lostText3: 'No entanto, alimentos e bebidas serão descartados no mesmo dia.',
    lightingTitle: 'Iluminação do quarto',
    lightingDesc: 'Após entrar no quarto, insira o porta-chaves do quarto na tomada elétrica ao lado da entrada para acender a iluminação do quarto.',
    lightingNote: '※Insira a chave na tomada elétrica.',
    longstayTitle: 'Para hóspedes de longa estadia',
    cleaningHours: 'As horas de limpeza são das 11:00 às 15:00.',
    cleaningRequest: 'Se desejar limpeza, por favor pendure o cartão Dondes "Por favor limpe" na maçaneta externa da porta antes das 11:00.',
    sheetExchange: 'Se desejar limpeza, por favor cole o ímã verde "Por favor limpe" no lado do corredor da porta de entrada antes das 9h da manhã seguinte.',
    noCleaning: 'Se não precisar de limpeza, por favor cole o ímã azul "Não perturbe" no lado do corredor da porta de entrada. Se não houver ímã, não faremos limpeza e apenas prepararemos toalhas na frente da porta. Do ponto de vista de higiene, a limpeza é a cada 3 dias (2 primeiras noites apenas troca de toalhas, 3ª noite limpeza, da 4ª noite em diante repete).',
    parking: 'Informações de estacionamento parceiro',
    parkingAllPrice: 'P1～P5: Todos 900 ienes por noite (Prolongação: 100 ienes por 30 minutos)',
    parkingMidExit: '※Taxas serão aplicadas se você sair durante a estadia.',
    parkingInquiry: '※Por favor, consulte, pois o estacionamento pode estar cheio dependendo do horário.',
    parkingP1Name: 'P1 Estacionamento Hotel Ace',
    parkingP2Name: 'P2 Estacionamento Ririka',
    parkingP3Name: 'P3 Mitsui Re-Park',
    parkingP4Name: 'P4 Estacionamento MOSS',
    parkingP5Name: 'P5 Estacionamento Cross Terrace',
    parkingUsageTime: '■Horários de uso:',
    parkingP1Time: '15:00～Dia seguinte 11:00',
    parkingP4Time: '16:00～Dia seguinte 11:00',
    parkingP5Time: '17:00～Dia seguinte 11:00',
    parkingExtension: '※Prolongação: 100 ienes por 30 minutos',
    parkingHeightLimit: '■Limite de altura:',
    parkingP2Height: 'Até 2.30m',
    parkingP4Height: 'Até 2.50m',
    parkingP5Height: 'Até 2.10m',
    parkingReservation: '■Reserva antecipada: Não disponível',
    officialHP: 'Site oficial',
    preparing: 'Informações detalhadas estão sendo preparadas.',
    dinnerCouponLine1: 'Para o jantar desta noite',
    dinnerCouponLine2: 'Ótimos cupons de restaurante',
    amenitiesTitle: 'Comum a todos os tipos de quarto',
    amenitiesNote: '※Os equipamentos estão disponíveis no 1º andar.',
    amenityTowel: 'Toalha',
    amenityBathTowel: 'Toalha de banho',
    amenityDryer: 'Secador de cabelo',
    amenityDeodorant: 'Spray desodorizante',
    amenityShampoo: 'Shampoo',
    amenityConditioner: 'Condicionador',
    amenityHandSoap: 'Sabonete para as mãos',
    amenityToothbrush: 'Kit de escovação',
    amenityBodySoap: 'Sabonete corporal',
    floor1F: '■ 1F',
    floor2F: '■ 2F',
    freeSpaceNote: '(O espaço livre não está disponível no 2º e 4º sábado de cada mês das 8:30 às 16:30 devido ao evento Chuo-dori Machikado Marche)',
    freeSpace: 'Espaço livre (WiFi e Tomadas)',
    freeSpaceHours: 'Horas disponíveis: 6:30～22:00',
    iwateSachiko: 'VTuber oficial da Prefeitura de Iwate "Iwate Sachiko"',
    wrappingVending: 'Máquina de venda automática embalada (Primeira unidade, embalagem de 4 lados)',
    souvenirVending1: 'Máquina de venda automática local (Lembranças de Iwate)',
    souvenirVending2: 'Máquina de venda automática local (Lembranças)',
    vendingMachineNote: 'As máquinas de venda automática também estão disponíveis no edifício anexo 3F e 6F',
    laundryHours: 'Horas disponíveis: 10:00～22:00',
  },
  'zh-TW': {
    hotelName: '',
    hotelTitle: '盛岡Ace酒店',
    heroTitle: '酒店館內指南',
    welcomeMessage: '感謝您今天入住「盛岡Ace酒店」。',
    welcomeMessage2: '如有任何疑問，請隨時諮詢前台工作人員。',
    restaurantCoupon: '餐飲優惠券',
    checkInOut: '入住/退房時間',
    bath: '大廳・設施',
    breakfast: '早餐',
    dinner: '晚餐・優惠券',
    service: '服務區',
    wifi: 'Wi-Fi',
    lighting: '室內照明',
    longstay: '連住客人須知',
    lost: '遺失物品',
    quickCheckin: '快速入住',
    dinnerTab: '晚餐・優惠券',
    serviceTab: '服務區',
    close: '關閉',
    checkIn: '入住',
    checkOut: '退房',
    planNote: '※根據預訂方案，時間可能有所不同。',
    bbhMember: 'BBH會員',
    earlyCheckin: '提早入住',
    earlyCheckinFee: '每小時1,000日圓（最晚14:00）',
    lobbyDesc1: '歐式古董家具裝飾的優雅大廳。',
    lobbyDesc2: '讓您忘卻都市喧囂的寧靜空間。',
    lobbyDesc3: '可從大廳直接進入「星巴克咖啡」。',
    breakfastVenue: '早餐會場',
    breakfastFloor: '1樓餐廳',
    breakfastTime: '營業時間',
    breakfastTimeDetail: '6:00～9:00（最終入店8:45）',
    breakfastDesc: '可享用使用岩手當地食材、營養豐富的自助早餐。',
    breakfastNotice: '營業時間可能會在不另行通知的情況下更改。',
    bathTitle: '大廳・設施',
    bathDescription: '男女分開大浴場 9F',
    operatingHours: '營業時間：',
    bathHours: '15:00~次日10:00',
    saunaNote: '(僅桑拿 1:00~5:00停止)',
    notice: '注意事項',
    bathNotice1: '※請自行從房間攜帶毛巾和洗漱用品。',
    bathNotice2: '※進入女性大浴場需要密碼。密碼將在前台提供。',
    freeService: '免費服務',
    bathServiceDesc: '我們免費提供乳酸菌飲料和冰棒。',
    breakfastTitle: '早餐（1F 餐廳）',
    breakfastPrice: '成人 1,200日圓（含稅）／兒童（小學生）800日圓（含稅）',
    breakfastHours: '6:15~9:30（最後入場9:00）',
    breakfastNote1: '※滿座時可能需要等待。',
    breakfastNote2: '※根據擁擠情況，營業時間可能會有所調整。',
    serviceTitle: '服務區',
    vendingMachine: '自動售貨機（冷凍食品・飲料・酒精）',
    alcoholNote: '(酒精飲料在5・7・9F)',
    microwave: '微波爐',
    iceMaker: '製冰機（別館3F也有）',
    smoking: '吸煙區',
    trouserPress: '褲子熨燙機',
    trouserPressLocation: '各樓層電梯前',
    laundry: '投幣式洗衣房',
    laundryNote: '※洗衣機/每次200日圓 烘乾機/10分鐘100日圓（洗滌劑在前台免費提供）',
    wifiTitle: 'Wi-Fi',
    password: '密碼：',
    wifiAccessPoint: '請查看您房間內設置的「客房互聯網指南」以了解接入點。',
    copy: '複製',
    wifiCopyNote: '※點擊按鈕即可複製密碼',
    passwordCopied: '密碼已複製！',
    lostTitle: '遺失物品',
    lostText1: '原則上，酒店不會就遺失物品聯繫客人。',
    lostText2: '如果沒有聯繫，根據遺失物品法，將在3個月後處理。',
    lostText3: '但是，食品飲料將在當天處理。',
    lightingTitle: '室內照明',
    lightingDesc: '進入房間後，將房間鑰匙扣插入入口旁的電源插座即可點亮室內照明。',
    lightingNote: '※將鑰匙插入電源插座。',
    longstayTitle: '連住客人須知',
    cleaningHours: '清掃時間為11:00～15:00。',
    cleaningRequest: '如需清掃，請在11:00前將Dondes卡「請清掃」掛在門外側門把手上。',
    sheetExchange: '如需清掃，請在早上9點前將綠色磁鐵「請打掃」貼在門外走廊側。',
    noCleaning: '如不需要清掃，請將藍色磁鐵「請勿打擾」貼在門外走廊側。如果沒有貼磁鐵，我們將不進行清掃，僅在門前準備毛巾類物品。出於衛生考慮，清掃為每3天1次（前2晚僅更換毛巾類，第3晚清掃，第4晚以後重複）。',
    parking: '合作停車場資訊',
    parkingAllPrice: 'P1～P5：全部一晚900日圓（延長30分鐘100日圓）',
    parkingMidExit: '※中途出庫時會產生費用。',
    parkingInquiry: '※根據時間段，停車場可能滿庫，請諮詢。',
    parkingP1Name: 'P1 盛岡Ace酒店停車場',
    parkingP2Name: 'P2 利利卡停車場',
    parkingP3Name: 'P3 三井Re-Park',
    parkingP4Name: 'P4 MOSS停車場',
    parkingP5Name: 'P5 Cross Terrace停車場',
    parkingUsageTime: '■使用時間：',
    parkingP1Time: '15:00～次日11:00',
    parkingP4Time: '16:00～次日11:00',
    parkingP5Time: '17:00～次日11:00',
    parkingExtension: '※延長30分鐘100日圓',
    parkingHeightLimit: '■車高限制：',
    parkingP2Height: '2.30m以下',
    parkingP4Height: '2.50m以下',
    parkingP5Height: '2.10m以下',
    parkingReservation: '■提前預約：不可用',
    parkingFee: '停車費',
    heightLimit: '高度限制',
    hours24: '24小時營業',
    discountTime: '折扣適用時間',
    parkingNote1: '※貨車、RV車、帶車頂行李架的車輛等，請使用此處。',
    parkingDiscount1: '入庫後24小時',
    parkingDiscount2: '入庫後24小時（可出入。需申報）',
    parkingDiscount3: '入庫後最多36小時（電話預約、可出入）',
    parkingNote2: '※從入庫到次日19點為一晚計算。（入庫可從早上7點開始）',
    parkingNote3: '※摩托車（需提前預約）一晚600日元。',
    parkingNote4: '※導航搜索時請輸入022-223-3863。',
    officialHP: '官方網站',
    preparing: '詳細信息正在準備中。',
    dinnerCouponLine1: '今晚的晚餐',
    dinnerCouponLine2: '超值餐飲優惠券',
    amenitiesTitle: '全部屋類型共通',
    amenitiesNote: '※設施用品在1樓準備。',
    amenityTowel: '毛巾',
    amenityBathTowel: '浴巾',
    amenityDryer: '吹風機',
    amenityDeodorant: '除臭噴霧',
    amenityShampoo: '洗髮水',
    amenityConditioner: '護髮素',
    amenityHandSoap: '洗手液',
    amenityToothbrush: '牙刷套裝',
    amenityBodySoap: '沐浴露',
    floor1F: '■ 1F',
    floor2F: '■ 2F',
    freeSpaceNote: '（每月第2・4個週六 8:30～16:30 因中央通街角集市舉辦，自由空間無法使用）',
    freeSpace: '自由空間（WiFi・插座）',
    freeSpaceHours: '使用時間段 6:30～22:00',
    iwateSachiko: '岩手縣公認VTuber「岩手さちこ」',
    wrappingVending: '包裝自動售貨機（初號機・4面包裝）',
    souvenirVending1: '當地自動售貨機（岩手特產）',
    souvenirVending2: '當地自動售貨機（特產）',
    vendingMachineNote: '自動售貨機在別館3F・6F也有',
    laundryHours: '使用時間段 10:00～22:00',
  },
};

function getTranslations(lang: LanguageCode) {
  const base = translations.en as Record<string, unknown>;
  const selected = (translations as Record<string, Record<string, unknown> | undefined>)[lang] ?? {};
  const merged: Record<string, unknown> = { ...base, ...selected };

  for (const key of Object.keys(base)) {
    const val = selected[key];
    if (typeof val === "string" && val.trim() === "") {
      merged[key] = base[key];
    }
  }

  return merged as typeof translations.en;
}

export default function Home() {
  const { language: selectedLanguage, setLanguage: setSelectedLanguage } = useLanguage();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showOtherLanguages, setShowOtherLanguages] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [breakfastImageIndex, setBreakfastImageIndex] = useState(0);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const [visibleServices, setVisibleServices] = useState<Set<string>>(new Set());

  const heroImages = [
    '/main-page/hero-picture/Y341439427.jpg',
    '/main-page/hero-picture/スクリーンショット 2026-02-08 2.03.32.png',
    '/main-page/hero-picture/スクリーンショット 2026-02-08 2.03.44.png',
    '/main-page/hero-picture/スクリーンショット 2026-02-08 2.04.01.png',
    '/main-page/hero-picture/スクリーンショット 2026-02-08 2.04.15.png',
    '/main-page/hero-picture/download.jpg',
  ];

  const breakfastImages = [
    '/main-page/10-topic-picture/morning-picture/breakfast005.jpg',
    '/main-page/10-topic-picture/morning-picture/breakfast008.jpg',
    '/main-page/10-topic-picture/morning-picture/breakfast012.jpg',
    '/main-page/10-topic-picture/morning-picture/breakfast013.jpg',
    '/main-page/10-topic-picture/morning-picture/スクリーンショット 2026-02-08 2.32.54.png',
    '/main-page/10-topic-picture/morning-picture/スクリーンショット 2026-02-08 2.33.05.png',
    '/main-page/10-topic-picture/morning-picture/スクリーンショット 2026-02-08 2.33.11.png',
    '/main-page/10-topic-picture/morning-picture/スクリーンショット 2026-02-08 2.33.21.png',
  ];

  const t = getTranslations(selectedLanguage);

  // 画像のスライドショー（4秒ごとに切り替え）
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    if (selectedService !== 'breakfast') return;

    const interval = setInterval(() => {
      setBreakfastImageIndex((prevIndex) => (prevIndex + 1) % breakfastImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedService, breakfastImages.length]);

  // サービスアイコンのスクロールアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const serviceId = entry.target.getAttribute('data-service-id');
            if (serviceId) {
              setVisibleServices((prev) => new Set(prev).add(serviceId));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const serviceElements = servicesGridRef.current?.querySelectorAll('[data-service-id]');
    serviceElements?.forEach((el) => observer.observe(el));

    return () => {
      serviceElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // ドロップダウン外をクリックした時に閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showOtherLanguages &&
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowOtherLanguages(false);
      }
    };

    if (showOtherLanguages) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOtherLanguages]);

  const services = [
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/main-page/icon-matome/icon-carry.svg"
            alt={t.checkInOut}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'checkInOut' as const,
      id: 'checkin',
      textColor: 'text-[#3E8668]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center scale-75">
          <Image
            src="/main-page/icon-matome/file.svg"
            alt={t.bath}
            width={112}
            height={112}
            className="object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'bath' as const,
      id: 'bath',
      textColor: 'text-[#3E8668]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/main-page/icon-matome/icon-food.svg"
            alt={t.breakfast}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'breakfast' as const,
      id: 'breakfast',
      textColor: 'text-[#3E8668]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/main-page/icon-matome/icon-beer.svg"
            alt={t.dinner}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'dinner' as const,
      id: 'dinner', 
      highlighted: true,
      textColor: 'text-white'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/main-page/icon-matome/icon-washmachine.svg"
            alt={t.service}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'service' as const,
      id: 'service',
      textColor: 'text-[#3E8668]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/main-page/icon-matome/icon-Wifi.svg"
            alt={t.wifi}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'wifi' as const,
      id: 'wifi',
      textColor: 'text-[#3E8668]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/main-page/icon-matome/icon-light.svg"
            alt={t.lighting}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'lighting' as const,
      id: 'lighting',
      textColor: 'text-[#3E8668]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src={encodeURI('/main-page/icon-matome/icon-bed (1).svg')}
            alt={t.longstay}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'longstay' as const,
      id: 'longstay',
      textColor: 'text-[#3E8668]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/main-page/icon-matome/icon-tool.svg"
            alt={t.lost}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'lost' as const,
      id: 'lost',
      textColor: 'text-[#3E8668]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/main-page/icon-matome/icon-parking.svg"
            alt={t.parking}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'parking' as const,
      id: 'parking',
      textColor: 'text-[#3E8668]'
    },
  ];

  const mainLanguages: Array<{ code: LanguageCode; flag: string; label: string }> = [
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'zh', flag: '🇨🇳', label: '中文' },
    { code: 'zh-TW', flag: '🇹🇼', label: '繁體中文' },
    { code: 'ko', flag: '🇰🇷', label: '한국어' },
    { code: 'ja', flag: '🇯🇵', label: '日本語' },
  ];

  const otherLanguages: Array<{ code: LanguageCode; flag: string; label: string }> = [
    { code: 'th', flag: '🇹🇭', label: 'ไทย' },
    { code: 'vi', flag: '🇻🇳', label: 'Tiếng Việt' },
    { code: 'tl', flag: '🇵🇭', label: 'Tagalog' },
    { code: 'id', flag: '🇮🇩', label: 'Bahasa Indonesia' },
    { code: 'ms', flag: '🇲🇾', label: 'Bahasa Melayu' },
    { code: 'fr', flag: '🇫🇷', label: 'Français' },
    { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
    { code: 'it', flag: '🇮🇹', label: 'Italiano' },
    { code: 'pt', flag: '🇵🇹', label: 'Português' },
  ];

return (
    <div className="min-h-screen bg-[#f9f2d4] overflow-x-hidden">
    {/* ヘッダー */}
    <header className="bg-white/98 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-1.5 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-1 py-1.5 sm:gap-2 sm:py-2">
          {/* 左側：ホテル名 */}
            <div className="flex items-center gap-1 sm:gap-2 shrink min-w-0 flex-1">
              <div className="min-w-0 flex-1 overflow-hidden">
              <h1 className="sr-only">
                {t.hotelName} {t.hotelTitle}
              </h1>
                <div className="relative h-14 w-full max-w-[380px] sm:h-20 sm:max-w-[550px] md:h-28 md:max-w-[750px]">
                <Image
                  src={encodeURI('/main-page/1141FB0E-4155-4A97-97AA-1726C242D2AF.JPG')}
                  alt={`${t.hotelName} ${t.hotelTitle}`}
                  fill
                  className="object-contain object-left"
                    sizes="(max-width: 640px) 380px, (max-width: 768px) 550px, 750px"
                  unoptimized
                />
              </div>
            </div>
          </div>

            {/* 右側：言語選択と飲食店クーポンボタン */}
            <div className="flex items-center justify-end shrink-0 space-x-0.5 sm:space-x-1 md:space-x-2 flex-nowrap ml-1">
              {/* 言語選択 */}
              <div ref={languageDropdownRef} className="flex items-center space-x-0 sm:space-x-0.5 md:space-x-1 relative flex-nowrap shrink-0">
                {/* Another Language ボタン */}
                <button
                  onClick={() => setShowOtherLanguages(!showOtherLanguages)}
                  className={`flex flex-col items-center p-0.5 sm:p-1 md:p-1.5 rounded transition-colors ${
                    showOtherLanguages
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                  title="Other Languages"
                >
                  <span className="flex items-center justify-center w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-7 md:h-7 text-xs sm:text-base md:text-xl leading-none">🌐</span>
                  <span className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-700 leading-tight mt-0.5">Another</span>
                </button>

                {/* 他の言語ドロップダウン */}
                {showOtherLanguages && (
                  <div 
                    className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 max-h-[60vh] sm:max-h-[300px] overflow-y-auto w-[calc(100vw-1rem)] sm:w-auto max-w-[calc(100vw-1rem)] sm:max-w-none"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {otherLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedLanguage(lang.code);
                            setShowOtherLanguages(false);
                          }}
                          className={`flex flex-col items-center p-1.5 sm:p-2 rounded transition-colors ${
                            selectedLanguage === lang.code
                              ? 'bg-blue-50'
                              : 'hover:bg-gray-50'
                          }`}
                          title={lang.label}
                        >
                          <span className="text-base sm:text-lg md:text-2xl leading-none mb-1">{lang.flag}</span>
                          <span className="text-[10px] sm:text-xs text-gray-700 leading-tight text-center">{lang.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 基本5言語 */}
                {mainLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedLanguage(lang.code);
                      setShowOtherLanguages(false);
                    }}
                    className={`flex flex-col items-center p-0.5 sm:p-1 md:p-1.5 rounded transition-colors ${
                      selectedLanguage === lang.code
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                    title={lang.label}
                  >
                    <span className="flex items-center justify-center w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-7 md:h-7 text-xs sm:text-base md:text-xl leading-none">{lang.flag}</span>
                    <span className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-700 leading-tight mt-0.5">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative bg-gray-900">
        <div className="relative h-96 sm:h-[500px] overflow-hidden">
          {heroImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt="HOTEL ドーミーイン Dormy inn"
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                unoptimized
              />
            </div>
          ))}
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <div className="text-center p-8 sm:p-12">
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
                {t.heroTitle}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ウェルカムメッセージ */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {t.welcomeMessage}
            <br className="hidden sm:block" />
            {t.welcomeMessage2}
          </p>
        </div>
      </section>

      {/* サービスグリッド */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={servicesGridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {services.map((service, index) => (
              service.id === 'dinner' ? (
                <Link
                  key={service.id}
                  data-service-id={service.id}
                  href="/coupon"
                  className={`p-3 sm:p-4 md:p-6 rounded-lg transition-all duration-700 ease-out flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] ${
                    visibleServices.has(service.id)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ 
                    backgroundColor: '#3E8668',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                    transitionDelay: visibleServices.has(service.id) ? `${index * 100}ms` : '0ms'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(62, 134, 104, 0.6), 0 25px 50px -12px rgba(0, 0, 0, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  <div className="mb-3 sm:mb-4 flex justify-center items-center shrink-0">
                    {service.icon}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-center leading-tight text-white wrap-break-word px-1">
                    {t[service.titleKey]}
                  </div>
                </Link>
              ) : service.id === 'lighting' ? (
                <button
                  key={service.id}
                  data-service-id={service.id}
                  onClick={() => {
                    if (service.id === 'breakfast') {
                      setBreakfastImageIndex(0);
                    }
                    setSelectedService(service.id);
                  }}
                  className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(62,134,104,0.6)] transition-all duration-300 ease-out flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] hover:scale-105 ${
                    visibleServices.has(service.id)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: visibleServices.has(service.id) ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <div className="mb-3 sm:mb-4 flex justify-center items-center shrink-0">
                    {service.icon}
                  </div>
                  <div className={`text-xs sm:text-sm font-semibold text-center leading-tight wrap-break-word px-1 ${service.textColor || 'text-blue-800'}`}>
                    {t[service.titleKey]}
                  </div>
                </button>
              ) : service.id === 'bath' ? (
                <button
                  key={service.id}
                  data-service-id={service.id}
                  onClick={() => {
                    if (service.id === 'breakfast') {
                      setBreakfastImageIndex(0);
                    }
                    setSelectedService(service.id);
                  }}
                  className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-xl hover:shadow-[0_0_25px_rgba(62,134,104,0.6)] transition-all duration-300 ease-out flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] hover:scale-105 ${
                    visibleServices.has(service.id)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: visibleServices.has(service.id) ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <div className="mb-3 sm:mb-4 flex justify-center items-center shrink-0">
                    {service.icon}
                  </div>
                  <div className={`text-[11px] sm:text-sm font-semibold text-center leading-snug wrap-break-word px-1 ${service.textColor || 'text-blue-800'}`}>
                    {(() => {
                      const label = t[service.titleKey];
                      if (typeof label !== 'string') return label;
                      const parts = label.split(' ');
                      if (parts.length < 2) return label;
                      return (
                        <>
                          <span className="block">{parts[0]}</span>
                          <span className="block">{parts.slice(1).join(' ')}</span>
                        </>
                      );
                    })()}
                  </div>
                </button>
              ) : (
                <button
                  key={service.id}
                  data-service-id={service.id}
                  onClick={() => {
                    if (service.id === 'breakfast') {
                      setBreakfastImageIndex(0);
                    }
                    setSelectedService(service.id);
                  }}
                  className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(62,134,104,0.6)] transition-all duration-300 ease-out flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] hover:scale-105 ${
                    visibleServices.has(service.id)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: visibleServices.has(service.id) ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <div className="mb-3 sm:mb-4 flex justify-center items-center shrink-0">
                    {service.icon}
                  </div>
                  <div className={`text-xs sm:text-sm font-semibold text-center leading-tight wrap-break-word px-1 ${service.textColor || 'text-blue-800'}`}>
                    {t[service.titleKey]}
                  </div>
                </button>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 飲食店クーポンとグリーンハウスボタン */}
      <section className="bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* 飲食店クーポンボタン */}
            <Link
              href="/coupon"
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all duration-300 min-h-[144px] sm:min-h-[144px] group hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(145deg, #059669, #047857)',
                padding: '3px',
              }}
            >
              {/* 背景画像グリッド */}
              <div className="absolute inset-0 grid grid-cols-3 gap-0.5">
                <div className="relative overflow-hidden">
                  <Image
                    src="/coupon-page/rikyuu/スクリーンショット 2026-02-01 22.43.06.png"
                    alt="お刺身"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative overflow-hidden">
                  <Image
                    src="/coupon-page/tama/スクリーンショット 2026-02-06 5.42.41.png"
                    alt="串焼き"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative overflow-hidden">
                  <Image
                    src="/coupon-page/toritetu/スクリーンショット 2026-02-06 5.32.32.png"
                    alt="焼肉"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* オーバーレイ */}
              <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/50 to-black/60 group-hover:from-black/50 group-hover:via-black/60 group-hover:to-black/70 transition-all duration-300 rounded-lg"></div>
              
              {/* 内側の光沢枠 */}
              <div className="absolute inset-[3px] rounded-[10px] border-2 border-white/20 pointer-events-none"></div>
              
              {/* テキストコンテンツ */}
              <div className="relative z-10 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[138px] sm:min-h-[138px] gap-3">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-black leading-tight mb-2" style={{ 
                    fontFamily: '"Hiragino Maru Gothic ProN", "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
                    color: '#FFE66D',
                    textShadow: '0 0 20px rgba(255, 230, 109, 0.8), 0 0 10px rgba(255, 200, 0, 0.6), 3px 3px 6px rgba(0, 0, 0, 0.9), -1px -1px 2px rgba(255, 255, 255, 0.3)',
                    letterSpacing: '0.05em'
                  }}>
                    {t.dinnerCouponLine1}
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-black leading-tight" style={{ 
                    fontFamily: '"Hiragino Maru Gothic ProN", "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
                    color: '#FFFFFF',
                    textShadow: '0 0 15px rgba(255, 140, 0, 0.7), 0 0 8px rgba(255, 100, 0, 0.5), 2px 2px 6px rgba(0, 0, 0, 0.9), -1px -1px 2px rgba(255, 200, 0, 0.4)',
                    letterSpacing: '0.08em'
                  }}>
                    {t.dinnerCouponLine2}
                  </div>
                </div>
              </div>
            </Link>

            {/* グリーンハウスボタン */}
            <a
              href="https://share.google/07ahmvGKgGyn44mSQ"
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-lg shadow-lg hover:shadow-[0_0_30px_rgba(62,134,104,0.6)] transition-all duration-300 min-h-[144px] sm:min-h-[144px] hover:scale-[1.02] active:scale-[0.98] overflow-hidden group"
            >
              {/* 背景画像グリッド */}
              <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
                <div className="relative overflow-hidden">
                  <Image
                    src="/main-page/431897.jpg"
                    alt="アウトドア用品店内"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative overflow-hidden">
                  <Image
                    src="/main-page/431898.jpg"
                    alt="キャンプ用品展示"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* オーバーレイ */}
              <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/60 group-hover:from-black/60 group-hover:via-black/50 group-hover:to-black/70 transition-all duration-300"></div>
              
              {/* 内側の光沢枠 */}
              <div className="absolute inset-[3px] rounded-[10px] border-2 border-white/20 pointer-events-none"></div>
              
              {/* コンテンツ */}
              <div className="relative z-10 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[138px] sm:min-h-[138px] gap-1">
                {/* ロゴ */}
                <div className="relative w-80 sm:w-96 h-24 sm:h-24">
                  <Image
                    src="/main-page/icon-matome/logo.svg"
                    alt="GREENHOUSE"
                    fill
                    className="object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                    sizes="(max-width: 640px) 320px, 384px"
                    unoptimized
                  />
                </div>
                
                {/* テキスト */}
                <div className="text-white text-[10px] sm:text-xs md:text-sm font-extrabold text-center drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)] tracking-widest uppercase leading-tight" style={{ fontFamily: '"Arial Black", "Helvetica", "Hiragino Kaku Gothic ProN", sans-serif', letterSpacing: '0.15em', textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(255,255,255,0.1)' }}>
                  チェックアウトの時間は<br />大自然へチェックイン
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ウェルカムメッセージ */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {t.welcomeMessage}
            <br className="hidden sm:block" />
            {t.welcomeMessage2}
          </p>
        </div>
      </section>

      {/* モーダルダイアログ */}
      {selectedService && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-4 sm:p-6 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedService === 'checkin' && (
              <>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{t.checkInOut}</h3>
                <div className="space-y-3 mb-4">
                  <div className="text-sm sm:text-base text-gray-700">
                    <span className="font-semibold">{t.checkIn}</span> 15:00〜
                  </div>
                  <div className="text-sm sm:text-base text-gray-700">
                    <span className="font-semibold">{t.checkOut}</span> 〜11:00
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  {t.planNote}
                </p>
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'bath' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.bathTitle}</h3>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-4">{t.amenitiesTitle}</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.amenityTowel}
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.amenityBathTowel}
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.amenityDryer}
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.amenityDeodorant}
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.amenityShampoo}
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.amenityConditioner}
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.amenityHandSoap}
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.amenityToothbrush}
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.amenityBodySoap}
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4 pl-5">{t.amenitiesNote}</p>
                </div>

                {/* アメニティ画像 */}
                <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                  <div className="relative w-full h-64">
                    <Image
                      src={encodeURI('/main-page/10-topic-picture/スクリーンショット 2026-02-08 2.24.32.png')}
                      alt="アメニティコーナー"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 672px"
                      unoptimized
                    />
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'breakfast' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {t.breakfastTitle}
                </h3>
                
                {/* 朝食セクション */}
                <div className="mb-6">
                    <div className="space-y-4 mb-4">
                      <div className="text-gray-700">
                      <span className="font-semibold">{t.breakfastTime}</span> {t.breakfastTimeDetail}
                      </div>
                    </div>
                  {/* 朝食の画像 */}
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <div className="relative w-full h-64">
                      <Image
                        src={breakfastImages[breakfastImageIndex]}
                        alt={selectedLanguage === 'ja' ? '朝食' : selectedLanguage === 'en' ? 'Breakfast' : selectedLanguage === 'zh' ? '早餐' : selectedLanguage === 'ko' ? '조식' : 'Breakfast'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                        unoptimized
                      />

                      <button
                        type="button"
                        aria-label="Previous photo"
                        onClick={() =>
                          setBreakfastImageIndex(
                            (prevIndex) =>
                              (prevIndex - 1 + breakfastImages.length) % breakfastImages.length
                          )
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/55 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-colors"
                      >
                        <span className="text-2xl leading-none">‹</span>
                      </button>

                      <button
                        type="button"
                        aria-label="Next photo"
                        onClick={() =>
                          setBreakfastImageIndex(
                            (prevIndex) => (prevIndex + 1) % breakfastImages.length
                          )
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/55 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-colors"
                      >
                        <span className="text-2xl leading-none">›</span>
                      </button>
                    </div>
                  </div>
                    <div className="space-y-2 text-gray-700">
                    <p className="font-semibold text-lg">{t.breakfastDesc}</p>
                    <p className="text-[#3E8668] font-bold text-base">{t.breakfastCatchphrase}</p>
                    <p className="text-sm text-gray-600">{t.breakfastNotice}</p>
                    </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'service' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.serviceTitle}</h3>
                
                {/* 1F */}
                <div className="mb-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{t.floor1F}</h4>
                  
                  {/* 1F画像 */}
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="w-full">
                      <Image
                        src="/main-page/10-topic-picture/431503.jpg"
                        alt="1Fサービスコーナー"
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg border border-gray-200"
                      />
                    </div>
                    <div className="w-full">
                      <Image
                        src="/main-page/10-topic-picture/431504.jpg"
                        alt="1Fサービスコーナー"
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg border border-gray-200"
                      />
                    </div>
                  </div>
                  
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3 mt-2 shrink-0"></span>
                      <div>
                        <div className="font-semibold">{t.freeSpace}</div>
                        <div className="text-sm text-gray-600 mt-1">{t.freeSpaceHours}</div>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.microwave}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.iwateSachiko}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.wrappingVending}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.souvenirVending1}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.souvenirVending2}
                    </li>
                  </ul>
                  
                  {/* 注意書き */}
                  <div className="bg-yellow-50 rounded-lg p-4 mt-4 border border-yellow-200">
                    <p className="text-sm text-gray-700 leading-relaxed">{t.freeSpaceNote}</p>
                  </div>
                </div>

                {/* 2F */}
                <div className="mb-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{t.floor2F}</h4>
                  
                  {/* 2F画像 */}
                  <div className="mb-4 w-full">
                    <Image
                      src="/main-page/10-topic-picture/431506.jpg"
                      alt="2Fサービスコーナー"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg border border-gray-200"
                    />
                  </div>
                  
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.vendingMachine}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.iceMaker}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.vendingMachineNote}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.microwave}
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3 mt-2 shrink-0"></span>
                      <div>
                        <div className="font-semibold">{t.laundry}</div>
                        <div className="text-sm text-gray-600 mt-1">{t.laundryHours}</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'wifi' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.wifiTitle}</h3>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-700 mb-4">
                    {t.wifiAccessPoint}
                  </p>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-[#E8F5F0] border border-[#3E8668] px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center">
                    <span className="font-bold text-gray-900">{t.password}</span>
                        <span className="font-bold text-[#3E8668] ml-2">0196543811</span>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('0196543811');
                          alert(t.passwordCopied);
                        }}
                        className="ml-4 bg-[#3E8668] hover:bg-[#2D6550] text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-1 shrink-0 shadow-lg hover:shadow-[0_0_20px_rgba(62,134,104,0.6)] hover:scale-105 active:scale-95"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {t.copy}
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 text-center">
                      {t.wifiCopyNote}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'lost' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.lostTitle}</h3>
                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p>
                      {t.lostText1}
                    </p>
                    {t.lostText2 && (
                      <p>
                        {t.lostText2}
                      </p>
                    )}
                    {t.lostText3 && (
                      <p>
                        {t.lostText3}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'lighting' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.lightingTitle}</h3>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {t.lightingDesc}
                  </p>
                  
                  {/* 図解の画像 */}
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <div className="relative w-full h-auto">
                      <Image
                      src={encodeURI("/main-page/10-topic-picture/81DA2A29-508F-4CE2-A164-50487C07036A.PNG")}
                      alt={t.lightingTitle}
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'longstay' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.longstayTitle}</h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <p className="text-base text-gray-700 leading-relaxed mb-4">
                      {t.cleaningHours.split(/(11:00[～\-]?\s*15:00|11:00\s*(to|～|-)\s*15:00)/).map((part, index) => {
                        if (/11:00[～\-]?\s*15:00|11:00\s*(to|～|-)\s*15:00/.test(part)) {
                          return <span key={index} className="font-semibold text-[#3E8668]">{part}</span>;
                        }
                        return <span key={index}>{part}</span>;
                      })}
                    </p>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {t.cleaningRequest.split(/(「[^」]+」|"[^"]+"|'[^']+'|11:00[までまでに]|11:00|before\s+11:00|by\s+11:00)/i).map((part, index) => {
                        if (/11:00[までまでに]|11:00|before\s+11:00|by\s+11:00/i.test(part)) {
                          return <span key={index} className="font-semibold text-red-600">{part}</span>;
                        }
                        if (/「[^」]+」|"[^"]+"|'[^']+'/.test(part)) {
                          return <span key={index} className="font-semibold text-[#3E8668]">{part}</span>;
                        }
                        return <span key={index}>{part}</span>;
                      })}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'parking' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.parking}</h3>

                {/* 駐車場マップ画像 */}
                <div className="mb-6 w-full">
                  <Image
                    src="/main-page/スクリーンショット 2026-02-08 23.49.16.png"
                    alt="提携駐車場マップ"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg border border-gray-200"
                    priority
                  />
                </div>

                {/* 駐車場情報 */}
                <div className="space-y-6 text-sm text-gray-800">
                  {/* 共通注意事項 */}
                  <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-300">
                    <div className="font-bold text-base mb-2 text-center text-red-600">
                      {t.parkingAllPrice}
                    </div>
                    <div className="text-xs text-gray-700 space-y-1 mt-2">
                      <p>{t.parkingMidExit}</p>
                      <p>{t.parkingInquiry}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="font-semibold text-lg mb-2">{t.parkingP1Name}</div>
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-red-600">{t.parkingUsageTime}{t.parkingP1Time}</p>
                      <p className="text-xs text-gray-600 mt-2">{t.parkingExtension}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="font-semibold text-lg mb-2">{t.parkingP2Name}</div>
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-red-600">{t.parkingUsageTime}{t.parkingP1Time}</p>
                      <p className="font-semibold">{t.parkingHeightLimit}{t.parkingP2Height}</p>
                      <p className="text-xs text-gray-600 mt-2">{t.parkingExtension}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="font-semibold text-lg mb-2">{t.parkingP3Name}</div>
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-red-600">{t.parkingUsageTime}{t.parkingP1Time}</p>
                      <p className="font-semibold">{t.parkingReservation}</p>
                      <p className="text-xs text-gray-600 mt-2">{t.parkingExtension}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="font-semibold text-lg mb-2">{t.parkingP4Name}</div>
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-red-600">{t.parkingUsageTime}{t.parkingP4Time}</p>
                      <p className="font-semibold">{t.parkingHeightLimit}{t.parkingP4Height}</p>
                      <p className="text-xs text-gray-600 mt-2">{t.parkingExtension}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="font-semibold text-lg mb-2">{t.parkingP5Name}</div>
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-red-600">{t.parkingUsageTime}{t.parkingP5Time}</p>
                      <p className="font-semibold">{t.parkingHeightLimit}{t.parkingP5Height}</p>
                      <p className="text-xs text-gray-600 mt-2">{t.parkingExtension}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService !== 'checkin' && selectedService !== 'bath' && selectedService !== 'breakfast' && selectedService !== 'service' && selectedService !== 'wifi' && selectedService !== 'lost' && selectedService !== 'lighting' && selectedService !== 'longstay' && selectedService !== 'parking' && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {services.find(s => s.id === selectedService) ? t[services.find(s => s.id === selectedService)!.titleKey] : ''}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t.preparing}
                </p>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* フッター */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            {/* 左側：ホテル情報 */}
            <div className="md:col-span-2 flex flex-col items-center text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {t.hotelName ? (
                  <>
                    {t.hotelName}<br />{t.hotelTitle}
                  </>
                ) : (
                  <>{t.hotelTitle}</>
                )}
              </h3>
              <div className="space-y-2 text-sm text-gray-700 mb-6">
                <p>〒020-0021<br />{selectedLanguage === 'ja' ? '岩手県盛岡市中央通２丁目１１−３５' : selectedLanguage === 'en' ? '2-11-35 Chuo-dori, Morioka, Iwate 020-0021' : selectedLanguage === 'zh' ? '岩手县盛冈市中央通2丁目11-35' : '이와테현 모리오카시 추오도리 2-11-35'}</p>
                <p>TEL 019-654-3811</p>
              </div>
              <div className="mt-6">
                <Link
                  href="https://breezbay-group.com/hgt-s-kokubuncho/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-col items-center space-y-2 hover:opacity-80 transition-opacity"
                >
                  <div className="relative w-20 h-20">
                    <Image
                      src={encodeURI('/main-page/Gemini_Generated_Image_i9zvggi9zvggi9zv.png')}
                      alt={selectedLanguage === 'ja' ? '鳥のキャラクター' : selectedLanguage === 'en' ? 'Bird Character' : selectedLanguage === 'zh' ? '鸟角色' : selectedLanguage === 'ko' ? '새 캐릭터' : 'Bird Character'}
                      fill
                      className="object-contain"
                      sizes="80px"
                      unoptimized
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{t.officialHP}</span>
                </Link>
              </div>
            </div>

            {/* 右側：Googleマップ */}
            <div className="md:col-span-3">
              <div className="w-full h-64 sm:h-80 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent('岩手県盛岡市中央通2丁目11-35 ホテルエース盛岡')}&output=embed&hl=ja&z=17`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="ホテルエース盛岡"
                ></iframe>
              </div>
            </div>
          </div>

          {/* コピーライト */}
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-xs text-gray-500">
              Copyright © BREEZBAY HOTEL All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
