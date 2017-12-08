<!DOCTYPE html>
<html>
<head>
	<title>EnMontoR Testing Data</title>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script>
	$( function() {
		$( "#datepicker" ).datepicker({ dateFormat: "yy-mm-dd" });
	} );
	</script>
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<div class="">
	<div class="col-lg-12">
		<div class="col-lg-3 pull-right">
			<div class="col-lg-6"> <br>
				<select id="meter" class="form-control">
					<option value="0">All Meters</option>
					<?php
						foreach ($meters as $mt) {
							?>
							<option <?php if($mid == $mt->mid) { echo " selected "; } ?>><?=$mt->mid?></option>
							<?php
						}
					?>
				</select>
			</div>
			<div class="col-lg-6"> <br>
				<a onclick="selectMeter()" class="btn btn-primary">Go</a>
				<a onclick="selectMeter()" class="btn btn-primary">F5</a>
			</div>
		</div>
		<div class="col-lg-2 pull-right"> <br>
			<input type="text" id="datepicker" value="<?=$tdt?>" class="form-control">
		</div>

		<h3>EnMontoR Data Testing</h3>
		<hr>
		<table class="table">
			<thead>
				<th>Meter</th>
				<th>Time</th>
				<th>Active Power</th>
				<th>Reactive Power</th>
				<th>Apparent Power</th>
				<th>CP Units</th>
				<th>Live Voltage</th>
				<th>Line Current</th>
				<th>Frequency</th>
				<th>Power Factor</th>
				<th>KVAH</th>
				<th>Neutral Current</th>
			</thead>
			<tbody>
				<?php
				if($data) {
					foreach ($data as $dt) {
						if($dt->meter_name) {
				?>
				<tr>
					<th><?=$dt->meter_name?></th>
					<td><?=$dt->ttime?></td>
					<td><?=$dt->act_power?></td>
					<td><?=$dt->react_power?></td>
					<td><?=$dt->kva?></td>
					<td><?=$dt->cp_units?></td>
					<td><?=$dt->lv?></td>
					<td><?=$dt->lc?></td>
					<td><?=$dt->fre?></td>
					<td><?=$dt->pf?></td>
					<td><?=$dt->kvah?></td>
					<td><?=$dt->neutral_current?></td>
				</tr>
				<?php
						}
					}
				}
				?>
			</tbody>
		</table>
	</div>
</div>
</body>
<script src="<?=base_url()?>assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="<?=base_url()?>assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script type="text/javascript">
	function selectMeter()
	{
		var mid = $("#meter").val();
		var sdt = $("#datepicker").val();
		// alert(mid);
		window.location = "<?=base_url()?>datatest/start/"+mid+"/"+sdt;
	}
</script>
</html>