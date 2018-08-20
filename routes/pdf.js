const express = require('express');
const router = express.Router();
const fs = require('fs');
const pdf = require('html-pdf');
const serviceAluno = require('../service/service-aluno');


var contadorPdf = 0;

global.gerarPDF = function (sqAluno1,sqAluno2,sqAluno3,sqAluno4){
	var html = fs.readFileSync(__dirname + '/../views/pdf.ejs', 'utf8');
	const options = { format: 'Letter' };
	html = html.replace(new RegExp("<sqAluno1>", 'g'), sqAluno1);
	html = html.replace(new RegExp("<sqAluno2>", 'g'), sqAluno2);
	html = html.replace(new RegExp("<sqAluno3>", 'g'), sqAluno3);
	html = html.replace(new RegExp("<sqAluno4>", 'g'), sqAluno4);
	// console.log('html', html);
	var filename = sqAluno1 + '_' + sqAluno2 + '_' + sqAluno3 + '_' + sqAluno4 + '.pdf';
	var pathfile = './pdf/' + filename;
	console.log('pathfile', pathfile);
	
	fs.exists(pathfile, function(exists) {
		console.log("file exists ? " + exists + " contadorPdf: " + contadorPdf);
		contadorPdf += 1;
		try {
			if (exists === false) {
				pdf.create(html, options).toFile(pathfile, function(err, res) {
				  if (err) return console.log(err);
				  console.log(res); // { filename: '/app/businesscard.pdf' }
				});
			}
		} catch(e){
			console.log('erro',e);
		}
	});
	
}

router.get('/', function(req, res, next) {

	// serviceAluno.findAll(function(err, result){
	// 	if (err) {return console.error(err);}

	// 	console.log('length',result.length);
	// 	var j = 0;
	// 	if(result.length){
	// 		for(var i = 0; i < result.length; i++){

	// 			if (j > 3) {
	// 				console.log('contador',result[i - 4].SQ_ALUNO+ ' - ' + result[i - 3].SQ_ALUNO+ ' - ' + result[i - 2].SQ_ALUNO+ ' - ' + result[i - 1].SQ_ALUNO);	
	// 				global.gerarPDF(result[i - 4].SQ_ALUNO, result[i - 3].SQ_ALUNO, result[i - 2].SQ_ALUNO, result[i - 1].SQ_ALUNO);
	// 				j = 1;
	// 			} else {
	// 				j += 1;
	// 			}
	// 		}

	// 		//global.gerarPDF(result[result.length - 4].SQ_ALUNO, result[result.length - 3].SQ_ALUNO, result[result.length - 2].SQ_ALUNO, result[result.length - 1].SQ_ALUNO);
	// 	} else {
	// 		global.gerarPDF(result.SQ_ALUNO);
	// 	}
	// })

	global.gerarPDF('009136', '005976', '006689', '008631');

	res.render('pdf', { title: 'QRCode' });
	
});

module.exports = router;
