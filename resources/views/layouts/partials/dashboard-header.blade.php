<header class="dashboard-header">
    <div class="dashboard-header-main">
        <button class="menu-toggle" type="button" data-sidebar-open aria-label="Buka menu" data-testid="open-sidebar-btn">
            <svg viewBox="0 0 24 24" fill="none" class="icon icon-menu">
                <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                <path d="M4 12H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                <path d="M4 17H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        </button>

        <div class="dashboard-heading desktop-heading">
            <span class="dashboard-heading-kicker">{{ $pageHeading }}</span>
            <h2>Sistem Manajemen Transportasi</h2>
            <p>Kelola armada dan keberangkatan dengan mudah</p>
        </div>

        <div class="dashboard-heading mobile-heading">
            <span class="mobile-heading-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" class="icon icon-bus">
                    <path d="M8 4H16C18.7614 4 21 6.23858 21 9V15C21 16.1046 20.1046 17 19 17H5C3.89543 17 3 16.1046 3 15V9C3 6.23858 5.23858 4 8 4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 17L6 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M17 17L18 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M7 13H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                    <path d="M17 13H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                    <path d="M6 9H18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
            </span>
            <span>Lancang Kuning Travelindo</span>
        </div>
    </div>

    <div class="dashboard-actions">
        <button class="notification-button" type="button" data-testid="notifications-btn" aria-label="Notifikasi">
            <svg viewBox="0 0 24 24" fill="none" class="icon icon-bell">
                <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6978 18 14.159V11C18 7.68629 15.3137 5 12 5C8.68629 5 6 7.68629 6 11V14.159C6 14.6978 5.78595 15.2141 5.40495 15.5951L4 17H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 17C10 18.1046 10.8954 19 12 19C13.1046 19 14 18.1046 14 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            <span class="notification-dot"></span>
        </button>

        <div class="dashboard-user-dropdown" data-user-dropdown>
            <button
                class="user-button"
                type="button"
                id="header-user-button"
                data-user-menu-trigger
                data-testid="user-menu-btn"
                aria-haspopup="menu"
                aria-expanded="false"
            >
                <span class="user-button-avatar" id="header-user-avatar" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" class="icon icon-user">
                        <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                    </svg>
                </span>
                <span class="user-button-name" id="header-user-name">Admin</span>
                <span class="user-button-chevron" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" class="icon icon-chevron-down">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </button>

            <div class="user-menu-panel" data-user-menu-panel hidden>
                <div class="user-menu-label">
                    <p class="user-menu-name" id="dropdown-user-name">{{ auth()->user()?->nama ?? 'Admin' }}</p>
                    <p class="user-menu-email" id="dropdown-user-email">{{ auth()->user()?->email ?? 'admin@pekanbaru.com' }}</p>
                </div>
                <div class="user-menu-divider"></div>
                <button class="user-menu-item user-menu-item-danger" type="button" data-auth-logout data-testid="logout-btn">
                    <svg viewBox="0 0 24 24" fill="none" class="icon icon-logout">
                        <path d="M9 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 12H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    </svg>
                    <span>Keluar</span>
                </button>
            </div>
        </div>
    </div>
</header>
