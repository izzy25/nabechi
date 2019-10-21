class Progress
{

	constructor(args, element, container){

		this.container = container;
		this.bar = element || this.container.querySelector('.progress-bar') || this.container.getElementById('progress-bar');

		if(args !== undefined){
			this.wrap = args[0];
			this.titleProgress = args[1];
		}else{
			this.wrap = document.createElement('div');
			this.titleProgress = document.createElement('span');
			this.titleProgress.innerHTML = 'Upload :&nbsp;';
			this.titleProgress.className = 'progress-bar_title'

			this.wrap.append(this.titleProgress);
			this.wrap.append(this.bar);
		}

		this.config = {
			max: 100,
			currentProgress: 0,
			class: 'content'
		};
		this.progress = 0;
		this.context = args;

		if(args !== undefined){
			return this.Config(args);
		}
		else
		{
			return this.Config(this.config);
		}

	}

	/**
	 * Init Description
	 * Create new element <progress> with some function
	 * //TODO create your Init function in another day
	 */
	Init(){



	}

	/**
	 * Configuration Description
	 * Configuration the progress bar with some costum style, delayed
	 */
	Config(configuration){

		this.config = configuration;

		if(this.config.max !== undefined){
			this.bar.max = this.config.max;
		}

		if(this.config.currentProgress !== undefined){
			this.bar.innerHTML = this.config.currentProgress + '%';
			this.bar.value = this.config.currentProgress;
			this.bar.className = 'progress-bar_bar'
		}

		if(this.config.class !== undefined){
			this.wrap.className = 'progress-bar ' + this.config.class;
		}

		return this;

	}

	Progressing(value){
		if(value !== undefined || value !== ''){

			this.bar.value = value;

		}
	}

	Start(){

	}

	Pause(){

	}

	Stop(){

	}

	Finish(){

	}

	Error(){

	}

}

export default Progress;