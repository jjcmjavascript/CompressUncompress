String.prototype.compress = function (){
	let i = 0; texto  = String(this);
	let incidencias = [];

	// busqueda y conteo
	while (i < texto.length){
		let exist = incidencias.find( e => e.char  == texto[i]);
		if( !exist ){
			incidencias.push({char : texto[i], count : 0});
			let largo  = incidencias.length -1;

			for (let ind = 0; ind < texto.length; ind ++) {
				texto[i] == texto[ind] ? (incidencias[largo].count++) : null;
				ind++;
			}
		}
		i++;
	};

	// organizacion mayo-menor
	incidencias = incidencias.sort((e,i) => i.count - e.count )
	// sustitucion por valor binario
	incidencias.forEach( (e,i) => {
		e.count = '1';
		for (let ind = 0; ind < i; ind++) {
			e.count = '0' + e.count;
		}

		texto = texto.replace( (new RegExp(e.char, 'g')), e.count);
	})
	incidencias = incidencias.map(e => e.char)
	
	return {compress : texto , incidencias }
}

Object.prototype.uncompress (){
	let div = this.compress.split('1');
	div = div.map(ele => {
		return this.incidencias[ele.length];
	})

	return div.join('');
}
