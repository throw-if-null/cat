import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";

/***
 * Usage: <h1 *permission="['admin']">Admin rule</h1>
 */

@Directive({
	selector: '[permission]'
})
export class PermissionDirective implements OnInit {
	private currentUser!: { permissions: string[] };
	private permissions: string[] = [];
	private logicalOp = 'AND';
	private isHidden = true;

	constructor(
		private element: ElementRef,
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef,
		private authService: AuthService
	) {
	}

	@Input()
	set permission(value: string[]) {
		this.permissions = value;
		this.updateView();
	}

	@Input()
	set permissionOp(permop: string) {
		this.logicalOp = permop;
		this.updateView();
	}

	ngOnInit() {
		this.authService.user$.subscribe(user => {
			if (!user) {
				return;
			}
			this.currentUser = { permissions: user['http://cat.com/roles'] };
			console.log(this.currentUser);
			this.updateView();
		});
	}

	private updateView() {
		if (this.checkPermission()) {
			if (this.isHidden) {
				this.viewContainer.createEmbeddedView(this.templateRef);
				this.isHidden = false;
			}
		} else {
			this.isHidden = true;
			this.viewContainer.clear();
		}
	}

	private checkPermission() {
		let hasPermission = false;

		if (this.currentUser && this.currentUser.permissions) {
			for (const checkPermission of this.permissions) {
				const permissionFound = this.currentUser.permissions.find(x => x.toUpperCase() === checkPermission.toUpperCase());

				if (permissionFound) {
					hasPermission = true;

					if (this.logicalOp === 'OR') {
						break;
					}
				} else {
					hasPermission = false;
					if (this.logicalOp === 'AND') {
						break;
					}
				}
			}
		}

		return hasPermission;
	}
}
