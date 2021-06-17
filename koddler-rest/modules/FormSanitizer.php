<?php
class FormSanitizer
{
    //Ripulisce i campi testo da eventuali caratteri indesiderati "ad esempio gli spazi"
    public static function sanitazeFormString($inputText)
    {
        $inputText = strip_tags($inputText);   //non fa inserire qualsiasi tipo di tag 
        $inputText = str_replace(" ", "", $inputText);     //Sostituisce uno spazio con una stringa vuota
        //$inputText = trim($inputText);
        $inputText = strtolower($inputText);
        $inputText = ucfirst($inputText);
        return $inputText;
    }

    public static function sanitazeFormUsername($inputText)
    {
        $inputText = strip_tags($inputText);
        $inputText = str_replace(" ", "", $inputText);
        return $inputText;
    }

    public static function sanitazeFormPassword($inputText)
    {
        $inputText = strip_tags($inputText);
        return $inputText;
    }

    public static function sanitazeFormEmail($inputText)
    {
        $inputText = strip_tags($inputText);
        $inputText = str_replace(" ", "", $inputText);
        return $inputText;
    }
}
