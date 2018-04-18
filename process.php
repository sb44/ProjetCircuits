<?php
if (isset($_POST['submit'])) {

// Add sandbox or paypal url mode
$paypal_url = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
// Add merchant's email id
//$merchant_email = 'sobhagya1411@gmail.com';
$merchant_email = 'touristiaVoyage.inc@gmail.com';
// Add retun URL for your website
$cancel_return = "http://localhost/Circuit/ProjetCircuits/circuits.html";
// Add success page URL for your website, this will call when customer done PayPal payment process
$success_return = "http://localhost/Circuit/ProjetCircuits/success.php";


//$price = $_POST['totalprice'];

$price=1.00;

$currency = 'USD';

$trip_details = "circuit voyage";
$circuit_name = 'circuit';

?>
<htm>
<head>
<title>Processing to Paypal</title>
</head>
<body>
<div style="margin-left: 38%"><img src="images/processing_animation.gif"/></div>
<!--In below form putting all PHP variables to their respective place -->
<form name="myform" action="<?php echo $paypal_url; ?>" method="post" target="_top">
<input type="hidden" name="cmd" value="_xclick">
<input type="hidden" name="business" value="<?php echo $merchant_email; ?>">
<input type="hidden" name="lc" value="C2">
<input type="hidden" name="item_number" value="voyage">
<input type="hidden" name="item_name" value="<?php echo $circuit_name; ?>">
<input type="hidden" name="amount" value="<?php echo $price; ?>">
<input type="hidden" name="currency_code" value="<?php echo $currency; ?>">
<input type="hidden" name="button_subtype" value="services">
<input type="hidden" name="no_note" value="0">
<input type="hidden" name="on0" value="Topinggs">
<input type="hidden" name="os0" value="<?php echo $trip_details; ?>">
<input type="hidden" name="cancel_return" value="<?php echo $cancel_return ?>">
<input type="hidden" name="return" value="<?php echo $success_return; ?>">
</form>
<!--At last submit that form to paypal -->
<script type="text/javascript">
document.myform.submit();
</script>
</body></htm>
<?php } ?>