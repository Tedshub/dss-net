<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WelcomeEmail extends Notification
{

    private $passwordRaw;

    /**
     * Create a new notification instance.
     * Kita terima password mentah (opsional) jika ingin dikirim di email
     */
    public function __construct($passwordRaw = null)
    {
        $this->passwordRaw = $passwordRaw;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $mail = (new MailMessage)
                    ->subject('Selamat Datang di Aplikasi Kami!')
                    ->greeting('Halo, ' . $notifiable->name)
                    ->line('Akun Anda telah berhasil dibuat oleh Admin.')
                    ->line('Silakan login menggunakan detail berikut:');
        
        // (Opsional) Tampilkan email
        $mail->line('Email: ' . $notifiable->email);

        // (Opsional) Tampilkan password jika Anda ingin user tahu passwordnya lewat email
        // Hati-hati: Ini kurang aman untuk production, tapi praktis untuk internal app.
        if ($this->passwordRaw) {
            $mail->line('Password: ' . $this->passwordRaw);
        }

        return $mail->action('Login Sekarang', route('login'))
                    ->line('Segera ganti password Anda setelah login untuk keamanan.')
                    ->line('Terima kasih telah bergabung!');
    }
}