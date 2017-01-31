const folder = require('../backend/render/folder.js');
const helper = require('../backend/render/helper.js');
const testDir = __dirname + '/test_dir';

module.exports = {
	'folder.js': {
		'#contains': {
			'should resolve false with no filenames': function() {
				return folder.contains(testDir, []).should.become(false)
			},
			'should resolve true when the file exists': () => {
				return folder.contains(testDir, ['test.txt']).should.become(true)
			},
			'should work with a string filename': () => {
				return folder.contains(testDir, 'test.txt').should.become(true)
			},
			'should work with multiple filenames': () => {
				return folder.contains(testDir, ['test.txt', 'other.txt'])
					.should.become(true);
			},
			'should find index in view folder': () => {
				return folder.contains(__dirname + '/../views/fields', ['index.marko', 'index.marko.js'])
					.should.become(true);
			}
		},
		'#list': {
			
		}
	},
	'helper.js': {
		'#promise': {
			'should resolve': () => {
				return helper.promise(testDir+'/index.marko', {}).should.be.fufilled
			},
			'should let data be optional': () => {
				return helper.promise(testDir+'/index.marko').should.be.fufilled;
			}
		},
		'#stream': {
			'should run': done => {
				let s = helper.stream(testDir+'/index.marko');
				s.pipe(process.stdout);
				s.on('end', done);
			}
		}
	}
}