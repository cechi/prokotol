import { css, html } from "lit";
import { BaseElement } from "./BaseElement";
import { customElement, query, queryAll, state } from "lit/decorators.js";
import { Space } from "@prokotol/protocol/src/types";
import { SpaceButton } from "./SpaceButton";
import { store, SpaceState } from "../store";

@customElement("prktl-strip")
export class Strip extends BaseElement<SpaceState> {

	static styles = [...BaseElement.styles, css`
		:host {
			
		}

		prktl-user {
			width: 30px;
			height: 30px;
			border-bottom: 1px solid var(--og-border-color);
		}

		prktl-spacebutton {
			width: 30px;
			height: 30px;
		}
	`];

	@state()
	spaces: Space[] = [];

	@queryAll("prktl-spacebutton")
	spaceButtons: NodeListOf<SpaceButton>;

	connectedCallback() {
		super.connectedCallback();
		this.subscribe(store, ({ spaces }) => {
			this.spaces = spaces;
			this.requestUpdate();
		})
	}

	_onSpaceButtonClick = (e: PointerEvent, space: Space) => {
		const target = e.target as SpaceButton;
		this.spaceButtons.forEach(button => button.active = button === target);
		console.log(space);
	}

	render = () => html`
		<prktl-user></prktl-user>
		${this.spaces.map(space => html`
			<prktl-spacebutton
				.space="${space}"
				@click="${(e: PointerEvent) => this._onSpaceButtonClick(e, space)}">
			</prktl-spacebutton>
		`)}
	`;

}