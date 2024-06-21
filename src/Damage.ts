export class Damage {
	constructor () {
	
	}
	
	damage (field: string) {
		if (field === undefined)
			return 0;
		const len = field.length;
		if (len <= 4)
			return 0;
		// Get the left two bytes as damage.
		// 获取剩余的两个字节作为损坏。
		let damage = parseInt(field.slice(0, len - 4), 16);
		// Check for third byte == 0x40.
		// 检查第三个字节==0x40。
		// console.log('old', damage);
		if (field[len - 4] === '4') {
			// Wrap in the 4th byte as extra damage.  See notes above.
			// 将第4个字节包裹起来作为额外伤害。请参阅上面的注释。
			// console.log(parseInt(field.slice(len - 2, len), 16), field.slice(len - 2, len), len)
			const rightDamage = parseInt(field.slice(len - 2, len), 16);
			// console.log(1 << 16, 1 * 65536)
			// console.log(2 << 16, 2 * 65536)
			// console.log(3 << 16, 3 * 65536)
			// console.log(4 << 16, 4 * 65536)
			// console.log('right', rightDamage, rightDamage << 16);
			damage = damage - rightDamage + (rightDamage << 16);
		}
		return damage;
	}
	
	flags (flags: string) {
		let _flags = flags;
		if (_flags === undefined)
			return 0;
		let len = _flags.length;
		if (len <= 8)
			_flags = _flags.padStart(8, '0');
		if (len > 8)
			_flags = _flags.slice(-8);
		len = _flags.length;
		// 获取掩码
		const mask = _flags.slice(-4, -2);
		// console.log(1, _flags, len);
		// console.log(2, len - 4);
		// console.log(3,  _flags.slice(0, len - 4));
		// console.log(parseInt(_flags.slice(0, len - 4), 16))
		if (mask === '60') {
			return {crit: true, direct: true}
		} else if (mask === '40') {
			return {crit: false, direct: true}
		} else if (mask === '20') {
			return {crit: true, direct: false}
		} else {
			return {crit: false, direct: false}
		}
	}
	
	flagsMask (flags: string) {
		let _flags = flags;
		if (_flags === undefined)
			return '00';
		let len = _flags.length;
		if (len <= 8)
			_flags = _flags.padStart(8, '0');
		if (len > 8)
			_flags = _flags.slice(-8);
		// 获取掩码
		return _flags.slice(-4, -2);
	}
}

const damage = new Damage();
export default damage;
