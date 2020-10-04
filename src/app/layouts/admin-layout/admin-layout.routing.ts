import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { SkuctnListComponent } from 'app/skuctn-list/skuctn-list.component';
import { LoginComponent } from 'app/login/login.component';
import { DirectAccessGuard } from 'app/services/DirectAccessGuard.service';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography', canActivate: [DirectAccessGuard], component: TypographyComponent },
    { path: 'skuctn-list',    component: SkuctnListComponent },
    { path: 'login',        component: LoginComponent },
];
