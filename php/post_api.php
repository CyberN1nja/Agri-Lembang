<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['jenis_sensor']) && !empty($data['nilai'])) {
    $jenis_sensor = $data['jenis_sensor'];
    $nilai = $data['nilai'];
    $waktu = date('Y-m-d H:i:s');

    $jenis_sensor_allowed = array("suhu", "kelembapan", "kelembapan_tanah");

    if (in_array($jenis_sensor, $jenis_sensor_allowed)) {
        $firebase_url = 'https://sensor-a277d-default-rtdb.asia-southeast1.firebasedatabase.app/';

        // Menambahkan ekstensi .json ke URI permintaan
        $firebase_url .= $jenis_sensor . '.json';

        $firebase_data = [
            'nilai' => $nilai,  // Mengganti 'nilai' menjadi 'value' sesuai struktur database Firebase
            'waktu' => $waktu,
        ];

        $ch = curl_init($firebase_url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($firebase_data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
        ));

        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($httpCode == 200) {
            echo json_encode(["status" => "success", "message" => "Data berhasil disimpan"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Gagal menyimpan data ke Firebase: " . $result]);
        }

        curl_close($ch);
    } else {
        echo json_encode(["status" => "error", "message" => "Jenis sensor tidak valid"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Data belum lengkap"]);
}
