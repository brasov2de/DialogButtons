import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import { ButtonBar, IButtonBarProps } from "./App/ButtonBar";


export class DialogButtons implements ComponentFramework.ReactControl<IInputs, IOutputs> {

	private notifyOutputChanged: () => void
	private container: HTMLDivElement;
	private value : number | undefined;
	
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	
	private setValue = (value : number |undefined) => {
		this.value = value;
		this.notifyOutputChanged();
		if(value!=null){
			window.setTimeout( () => {
				this.setValue(undefined);
			}, 1000);
		}

	}


	private renderControl(context: ComponentFramework.Context<IInputs>){		
		const disabled = context.parameters.disabledButtons?.raw;
		const visible = context.parameters.visibleButtons?.raw;		
		const props : IButtonBarProps = {
			options : context.parameters.buttons.attributes?.Options ?? [], 
			setValue: this.setValue, 
			disabledButtons : context.parameters.disabledButtons?.raw, 
			visibleButtons : context.parameters.visibleButtons?.raw,
			icons :  JSON.parse(context.parameters.icons?.raw ?? '{"1": "CircleShapeSolid"}'), 
			useOptionsColor : context.parameters.useOptionsColor?.raw,
			align : context.parameters.align?.raw, 
			webAPI : context.webAPI, 
			whiteButtons : context.parameters.whiteButtons?.raw
		}
		return React.createElement(ButtonBar, props);
	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this.container = container;
		this.notifyOutputChanged = notifyOutputChanged;
		//this.renderControl(context);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement
	{
		//todo: don't render when the value changed. It'S not shown
		return this.renderControl(context);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			buttons: this.value
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		//ReactDOM.unmountComponentAtNode(this.container);
	}
}