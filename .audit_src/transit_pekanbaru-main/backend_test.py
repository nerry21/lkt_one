#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
import time

class PekanbaruTransitAPITester:
    def __init__(self, base_url="https://pekanbaru-transit.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.created_ids = {
            'drivers': [],
            'mobil': [],
            'keberangkatan': []
        }

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {method} {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return True, response.json() if response.content else {}
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_detail = response.json()
                    print(f"   Error: {error_detail}")
                except:
                    print(f"   Response: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_register(self):
        """Test user registration"""
        timestamp = int(time.time())
        test_data = {
            "email": f"test_user_{timestamp}@example.com",
            "password": "TestPass123!",
            "nama": f"Test User {timestamp}"
        }
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            200,
            data=test_data
        )
        
        if success and 'access_token' in response:
            self.token = response['access_token']
            self.user_id = response['user']['id']
            print(f"   Registered user: {response['user']['email']}")
            return True
        return False

    def test_login(self):
        """Test user login with existing credentials"""
        # Try to login with a test account
        test_data = {
            "email": "admin@pekanbaru.com",
            "password": "admin123"
        }
        
        success, response = self.run_test(
            "User Login",
            "POST",
            "auth/login",
            200,
            data=test_data
        )
        
        if success and 'access_token' in response:
            self.token = response['access_token']
            self.user_id = response['user']['id']
            print(f"   Logged in as: {response['user']['email']}")
            return True
        
        # If admin login fails, try with registered user
        print("   Admin login failed, using registration flow...")
        return self.test_register()

    def test_get_me(self):
        """Test get current user"""
        success, response = self.run_test(
            "Get Current User",
            "GET",
            "auth/me",
            200
        )
        return success

    def test_create_driver(self):
        """Test creating a driver"""
        driver_data = {
            "nama": "Test Driver",
            "lokasi": "Pekanbaru"
        }
        
        success, response = self.run_test(
            "Create Driver",
            "POST",
            "drivers",
            200,
            data=driver_data
        )
        
        if success and 'id' in response:
            self.created_ids['drivers'].append(response['id'])
            print(f"   Created driver ID: {response['id']}")
        return success

    def test_get_drivers(self):
        """Test getting drivers list"""
        success, response = self.run_test(
            "Get Drivers List",
            "GET",
            "drivers",
            200,
            params={'page': 1, 'limit': 10}
        )
        return success

    def test_get_drivers_count(self):
        """Test getting drivers count"""
        success, response = self.run_test(
            "Get Drivers Count",
            "GET",
            "drivers/count",
            200
        )
        return success

    def test_create_mobil(self):
        """Test creating a mobil"""
        mobil_data = {
            "kode_mobil": "TEST-001",
            "jenis_mobil": "Hiace"
        }
        
        success, response = self.run_test(
            "Create Mobil",
            "POST",
            "mobil",
            200,
            data=mobil_data
        )
        
        if success and 'id' in response:
            self.created_ids['mobil'].append(response['id'])
            print(f"   Created mobil ID: {response['id']}")
        return success

    def test_get_mobil(self):
        """Test getting mobil list"""
        success, response = self.run_test(
            "Get Mobil List",
            "GET",
            "mobil",
            200,
            params={'page': 1, 'limit': 10}
        )
        return success

    def test_create_keberangkatan(self):
        """Test creating keberangkatan"""
        if not self.created_ids['drivers'] or not self.created_ids['mobil']:
            print("   Skipping - No drivers or mobil created")
            return False
            
        keberangkatan_data = {
            "tanggal": "2024-01-15",
            "kode_mobil": "TEST-001",
            "driver_id": self.created_ids['drivers'][0],
            "jumlah_penumpang": 10,
            "tarif_penumpang": 150000,
            "jumlah_paket": 5,
            "uang_paket": 125000,
            "trip_ke": 1
        }
        
        success, response = self.run_test(
            "Create Keberangkatan",
            "POST",
            "keberangkatan",
            200,
            data=keberangkatan_data
        )
        
        if success and 'id' in response:
            self.created_ids['keberangkatan'].append(response['id'])
            print(f"   Created keberangkatan ID: {response['id']}")
            
            # Verify Uang PC calculation (15% of total)
            total = (10 * 150000) + 125000  # 1,625,000
            expected_uang_pc = total * 0.15  # 243,750
            expected_uang_bersih = total * 0.85  # 1,381,250
            
            actual_uang_pc = response.get('uang_pc', 0)
            actual_uang_bersih = response.get('uang_bersih', 0)
            
            if abs(actual_uang_pc - expected_uang_pc) < 1:
                print(f"   ✅ Uang PC calculation correct: {actual_uang_pc}")
            else:
                print(f"   ❌ Uang PC calculation wrong: expected {expected_uang_pc}, got {actual_uang_pc}")
                
            if abs(actual_uang_bersih - expected_uang_bersih) < 1:
                print(f"   ✅ Uang Bersih calculation correct: {actual_uang_bersih}")
            else:
                print(f"   ❌ Uang Bersih calculation wrong: expected {expected_uang_bersih}, got {actual_uang_bersih}")
        
        return success

    def test_get_keberangkatan(self):
        """Test getting keberangkatan list"""
        success, response = self.run_test(
            "Get Keberangkatan List",
            "GET",
            "keberangkatan",
            200,
            params={'page': 1, 'limit': 10}
        )
        return success

    def test_dashboard_statistics(self):
        """Test dashboard statistics"""
        success, response = self.run_test(
            "Get Dashboard Statistics",
            "GET",
            "statistics/dashboard",
            200
        )
        
        if success:
            required_fields = ['total_drivers', 'total_mobil', 'total_keberangkatan', 
                             'total_uang_pc', 'total_uang_bersih', 'total_penumpang', 'total_paket']
            for field in required_fields:
                if field in response:
                    print(f"   ✅ {field}: {response[field]}")
                else:
                    print(f"   ❌ Missing field: {field}")
        
        return success

    def test_revenue_chart(self):
        """Test revenue chart data"""
        success, response = self.run_test(
            "Get Revenue Chart Data",
            "GET",
            "statistics/revenue-chart",
            200
        )
        return success

    def test_mobil_revenue(self):
        """Test mobil revenue data"""
        success, response = self.run_test(
            "Get Mobil Revenue Data",
            "GET",
            "statistics/mobil-revenue",
            200
        )
        return success

    def test_seed_data(self):
        """Test seed dummy data"""
        success, response = self.run_test(
            "Seed Dummy Data",
            "POST",
            "seed",
            200
        )
        
        if success:
            print(f"   Created: {response.get('drivers', 0)} drivers, {response.get('mobil', 0)} mobil, {response.get('keberangkatan', 0)} keberangkatan")
        
        return success

    def test_export_csv(self):
        """Test CSV export endpoints"""
        endpoints = [
            ("Export Keberangkatan CSV", "export/keberangkatan/csv"),
            ("Export Drivers CSV", "export/drivers/csv"),
            ("Export Mobil CSV", "export/mobil/csv")
        ]
        
        all_success = True
        for name, endpoint in endpoints:
            # For CSV exports, we expect different content type
            url = f"{self.base_url}/api/{endpoint}"
            headers = {}
            if self.token:
                headers['Authorization'] = f'Bearer {self.token}'
            
            self.tests_run += 1
            print(f"\n🔍 Testing {name}...")
            
            try:
                response = requests.get(url, headers=headers)
                if response.status_code == 200 and 'text/csv' in response.headers.get('content-type', ''):
                    self.tests_passed += 1
                    print(f"✅ Passed - CSV export working")
                else:
                    print(f"❌ Failed - Status: {response.status_code}, Content-Type: {response.headers.get('content-type')}")
                    all_success = False
            except Exception as e:
                print(f"❌ Failed - Error: {str(e)}")
                all_success = False
        
        return all_success

    def test_search_and_pagination(self):
        """Test search and pagination functionality"""
        # Test driver search
        success1, _ = self.run_test(
            "Search Drivers",
            "GET",
            "drivers",
            200,
            params={'search': 'Test', 'page': 1, 'limit': 5}
        )
        
        # Test mobil search
        success2, _ = self.run_test(
            "Search Mobil",
            "GET",
            "mobil",
            200,
            params={'search': 'TEST', 'page': 1, 'limit': 5}
        )
        
        # Test keberangkatan search
        success3, _ = self.run_test(
            "Search Keberangkatan",
            "GET",
            "keberangkatan",
            200,
            params={'search': 'TEST', 'page': 1, 'limit': 5}
        )
        
        return success1 and success2 and success3

    def cleanup_test_data(self):
        """Clean up created test data"""
        print(f"\n🧹 Cleaning up test data...")
        
        # Delete keberangkatan
        for item_id in self.created_ids['keberangkatan']:
            self.run_test(f"Delete Keberangkatan {item_id}", "DELETE", f"keberangkatan/{item_id}", 200)
        
        # Delete drivers
        for item_id in self.created_ids['drivers']:
            self.run_test(f"Delete Driver {item_id}", "DELETE", f"drivers/{item_id}", 200)
        
        # Delete mobil
        for item_id in self.created_ids['mobil']:
            self.run_test(f"Delete Mobil {item_id}", "DELETE", f"mobil/{item_id}", 200)

def main():
    print("🚌 Pekanbaru Transit Management System - API Testing")
    print("=" * 60)
    
    tester = PekanbaruTransitAPITester()
    
    # Test sequence
    test_sequence = [
        ("Authentication", [
            tester.test_login,
            tester.test_get_me
        ]),
        ("Driver Management", [
            tester.test_create_driver,
            tester.test_get_drivers,
            tester.test_get_drivers_count
        ]),
        ("Mobil Management", [
            tester.test_create_mobil,
            tester.test_get_mobil
        ]),
        ("Keberangkatan Management", [
            tester.test_create_keberangkatan,
            tester.test_get_keberangkatan
        ]),
        ("Statistics & Dashboard", [
            tester.test_dashboard_statistics,
            tester.test_revenue_chart,
            tester.test_mobil_revenue
        ]),
        ("Data Management", [
            tester.test_seed_data
        ]),
        ("Export & Search", [
            tester.test_export_csv,
            tester.test_search_and_pagination
        ])
    ]
    
    failed_tests = []
    
    for category, tests in test_sequence:
        print(f"\n📋 {category}")
        print("-" * 40)
        
        for test_func in tests:
            try:
                if not test_func():
                    failed_tests.append(test_func.__name__)
            except Exception as e:
                print(f"❌ {test_func.__name__} - Exception: {str(e)}")
                failed_tests.append(test_func.__name__)
    
    # Cleanup
    tester.cleanup_test_data()
    
    # Final results
    print(f"\n📊 Test Results")
    print("=" * 60)
    print(f"Tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Tests failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%")
    
    if failed_tests:
        print(f"\n❌ Failed tests:")
        for test in failed_tests:
            print(f"   - {test}")
    
    if tester.tests_passed == tester.tests_run:
        print(f"\n🎉 All tests passed! API is working correctly.")
        return 0
    else:
        print(f"\n⚠️  Some tests failed. Please check the API implementation.")
        return 1

if __name__ == "__main__":
    sys.exit(main())