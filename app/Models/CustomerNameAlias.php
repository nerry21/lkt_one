<?php

namespace App\Models;

/**
 * @deprecated  Gunakan CustomerAlias sebagai gantinya.
 *
 * File ini dipertahankan untuk backward compatibility agar code lama yang
 * masih mereferensikan CustomerNameAlias::class tidak langsung error.
 *
 * Semua method dan property diwarisi dari CustomerAlias.
 * Table yang dipakai tetap 'customer_aliases' (dari CustomerAlias).
 *
 * Migrasi: ganti semua referensi CustomerNameAlias → CustomerAlias secara bertahap.
 */
class CustomerNameAlias extends CustomerAlias
{
    // Intentionally empty — semua logic ada di CustomerAlias
}
