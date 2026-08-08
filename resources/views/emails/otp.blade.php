<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Kode OTP Anda</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h2 style="color: #4f46e5; text-align: center;">Verifikasi Akun Anda</h2>
        <p>Halo,</p>
        <p>Terima kasih telah mendaftar. Untuk melanjutkan proses verifikasi, silakan gunakan kode OTP (One-Time Password) berikut:</p>
        <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #1f2937; background: #f3f4f6; padding: 10px 20px; border-radius: 6px;">{{ $otp }}</span>
        </div>
        <p>Kode OTP ini <strong>hanya berlaku selama 5 menit</strong>. Jangan berikan kode ini kepada siapa pun demi keamanan akun Anda.</p>
        <p>Jika Anda tidak merasa melakukan permintaan ini, Anda dapat mengabaikan email ini.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
        <p style="font-size: 12px; color: #6b7280; text-align: center;">
            &copy; {{ date('Y') }} Sistem Pendukung Keputusan RKS. Hak cipta dilindungi undang-undang.
        </p>
    </div>
</body>
</html>
