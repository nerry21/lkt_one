<aside class="dashboard-sidebar" data-sidebar>
    <div class="sidebar-brand">
        <div class="sidebar-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" class="icon icon-bus">
                <path d="M8 4H16C18.7614 4 21 6.23858 21 9V15C21 16.1046 20.1046 17 19 17H5C3.89543 17 3 16.1046 3 15V9C3 6.23858 5.23858 4 8 4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 17L6 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                <path d="M17 17L18 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                <path d="M7 13H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                <path d="M17 13H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                <path d="M6 9H18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        </div>
        <div>
            <h1>Lancang Kuning</h1>
            <p>Travelindo</p>
        </div>
        <button class="sidebar-close" type="button" data-sidebar-close aria-label="Tutup menu" data-testid="close-sidebar-btn">
            <svg viewBox="0 0 24 24" fill="none" class="icon icon-close">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        </button>
    </div>

    <nav class="sidebar-nav">
        @foreach ($menuItems as $item)
            @php
                $isActive = request()->routeIs($item['route']);
            @endphp
            <a
                href="{{ route($item['route']) }}"
                class="sidebar-link {{ $isActive ? 'is-active' : '' }}"
                data-testid="{{ $item['testid'] }}"
                @if (!empty($item['requires_admin']))
                    data-role-scope="admin"
                    hidden
                @endif
            >
                <span class="sidebar-link-icon" aria-hidden="true">
                    @switch($item['icon'])
                        @case('dashboard')
                            <svg viewBox="0 0 24 24" fill="none" class="icon icon-dashboard">
                                <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.8"/>
                                <rect x="13" y="3" width="8" height="5" rx="2" stroke="currentColor" stroke-width="1.8"/>
                                <rect x="13" y="10" width="8" height="11" rx="2" stroke="currentColor" stroke-width="1.8"/>
                                <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.8"/>
                            </svg>
                            @break
                        @case('bus')
                            <svg viewBox="0 0 24 24" fill="none" class="icon icon-bus">
                                <path d="M8 4H16C18.7614 4 21 6.23858 21 9V15C21 16.1046 20.1046 17 19 17H5C3.89543 17 3 16.1046 3 15V9C3 6.23858 5.23858 4 8 4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7 17L6 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                <path d="M17 17L18 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                <path d="M7 13H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                                <path d="M17 13H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                                <path d="M6 9H18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            </svg>
                            @break
                        @case('users')
                            <svg viewBox="0 0 24 24" fill="none" class="icon icon-users">
                                <path d="M16 21V19C16 17.3431 14.6569 16 13 16H7C5.34315 16 4 17.3431 4 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                <circle cx="10" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                                <path d="M20 21V19C20 17.5978 19.0344 16.4215 17.7324 16.0996" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                <path d="M14.5 4.23408C15.9658 4.86569 17 6.32446 17 8.02487C17 9.72529 15.9658 11.1841 14.5 11.8157" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            </svg>
                            @break
                        @case('car')
                            <svg viewBox="0 0 24 24" fill="none" class="icon icon-car">
                                <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                                <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                                <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                            </svg>
                            @break
                        @case('package')
                            <svg viewBox="0 0 24 24" fill="none" class="icon icon-package">
                                <path d="M12 3L19 7V17L12 21L5 17V7L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                                <path d="M12 12L19 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 12L5 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 12V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            </svg>
                            @break
                    @endswitch
                </span>
                <span class="sidebar-link-label">{{ $item['label'] }}</span>
                <span class="sidebar-link-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" class="icon icon-chevron-right">
                        <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </a>
        @endforeach
    </nav>

    <div class="sidebar-user">
        <div class="sidebar-user-avatar" id="sidebar-user-avatar" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" class="icon icon-user">
                <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
            </svg>
        </div>
        <div class="sidebar-user-copy">
            <p class="sidebar-user-name" id="sidebar-user-name">Admin</p>
            <p class="sidebar-user-email" id="sidebar-user-email">admin@pekanbaru.com</p>
        </div>
    </div>
</aside>
