<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class SendOtpMail extends Mailable
{
    public $otp;

    public function __construct($otp)
    {
        $this->otp = $otp;
    }

    public function build()
    {
        return $this->subject('Your OTP Code')
                    ->view('emails.otp')
                    ->with(['otp' => $this->otp]);
    }
}
